import dotenv from "dotenv";
dotenv.config();
import { Prisma } from ".prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

export const getWorkspaces = async (req: any, res: Response) => {
  const { email } = req.userData;
  try {
    await prisma.$connect();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const workspaces = await prisma.workspace.findMany({
      where: {
        authorId: existingUser.id,
      },
    });
    return res.status(200).json({ workspaces });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};
export const createWorkspace = async (req: any, res: Response) => {
  const { email } = req.userData;
  const { workspaceName } = req.body;

  try {
    await prisma.$connect();
    const existingWorkspace = await prisma.workspace.findFirst({
      where: {
        name: workspaceName,
        author: {
          email: email,
        },
      },
    });

    if (existingWorkspace) {
      return res.status(400).json({ message: "Workspace name already exists" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    await prisma.workspace.create({
      data: {
        name: workspaceName,
        authorId: existingUser.id,
      },
    });

    const workspaces = await prisma.workspace.findMany({
      where: {
        authorId: existingUser.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Workspace created successfully", workspaces });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};
