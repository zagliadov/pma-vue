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
