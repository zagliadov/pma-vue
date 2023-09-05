import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import { handleError } from "../helpers/helpers";
import { getProjectAssigneeByEmail } from "./query";
import { CreateUserInput, CreateUserOutput, IUserCreate } from "./interfaces";

const createUser = async ({
  username,
  email,
  bcrypt_password,
}: CreateUserInput): Promise<CreateUserOutput> => {
  try {
    await prisma.$connect();
    const { id: userId } = await prisma.user.create({
      data: {
        name: username,
        email,
        password: bcrypt_password,
      },
      select: {
        id: true,
      },
    });
    return { userId };
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const createAccount = async (req: Request, res: Response) => {
  const { username, workspace, email, password }: IUserCreate = req.body;
  const bcrypt_password: string = await bcrypt.hash(
    password,
    Number(process.env.SALT)
  );
  try {
    await prisma.$connect();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const isUserAssignee = await getProjectAssigneeByEmail(email);
    const { userId: id } = await createUser({
      username,
      email,
      bcrypt_password,
    });
    if (!id) return res.status(500).json({ message: "Failed to create user" });
    await prisma.workspace.create({
      data: {
        name: workspace,
        authorId: id,
      },
    });
    if (id && workspace) {
      if (isUserAssignee && isUserAssignee.length > 0) {
        await prisma.projectAssignee.updateMany({
          where: { email },
          data: {
            userId: id,
            isEmailConfirmed: true,
          },
        });
        await prisma.taskAssignee.updateMany({
          where: { email },
          data: {
            userId: id,
            isEmailConfirmed: true,
          },
        });
      }
      return res.status(201).json({ message: "User create" });
    }
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

const createJwtToken = (id: number, name: string, email: string) => {
  try {
    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
    const payload = {
      id,
      name,
      email,
    };
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await prisma.$connect();
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        workspace: {
          include: {
            projects: true,
          },
        },
      },
    });
    if (!existingUser)
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = createJwtToken(
      existingUser.id,
      existingUser.name as string,
      existingUser.email
    );
    if (token)
      res.status(200).json({ token: token, existingUser: existingUser });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const verifyToken = async (req: any, res: any) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string = authHeader && authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Authentication failed" });
    const decodedToken: any = await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const expirationTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;
    if (expirationTime < currentTime) {
      console.log("Token is not valid");
      return res.status(401).json({ message: "Authentication failed" });
    } else {
      await prisma.$connect();
      const { email } = decodedToken;
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
        include: {
          workspace: {
            include: {
              projects: true,
            },
          },
        },
      });
      if (existingUser) res.status(200).json({ existingUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  } finally {
    await prisma.$disconnect();
  }
};
