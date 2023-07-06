import dotenv from "dotenv";
dotenv.config();
import { Prisma } from ".prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

interface IUserCreate {
  username: string;
  workspace: string;
  email: string;
  password: string;
}

export const createAccount = async (req: Request, res: Response) => {
  const { username, workspace, email, password }: IUserCreate = req.body;
  const bcrypt_password: string = await bcrypt.hash(
    password,
    Number(process.env.SALT)
  );
  const userId: Prisma.UserSelect = {
    id: true,
  };
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const { id } = await prisma.user.create({
      data: {
        name: username,
        email,
        password: bcrypt_password,
      },
      select: userId,
    });
    if (!id) return res.status(500).json({ message: "Failed to create user" });
    const workspaces = await prisma.workspace.create({
      data: {
        name: workspace,
        authorId: id,
      },
    });
    if (id && workspace) {
      return res.status(201).json({ message: "User create" });
    }
  } catch (error) {
    handleError(error, res);
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
  console.log(email, password)
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
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
    if (token) res.status(200).json({ token: token });
  } catch (error) {
    handleError(error, res);
  }
};

export const verifyToken = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers["authorization"];
    const token: string = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authentication failed" });
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
      req.userData = decodedToken;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};