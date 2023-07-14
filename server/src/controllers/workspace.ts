import dotenv from "dotenv";
dotenv.config();
import { Prisma } from ".prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

export const createWorkspace = async (req: any, res: Response) => {
  const { email } = req.userData;
  const { workspaceName } = req.body;

  try {
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

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const workspace = await prisma.workspace.create({
      data: {
        name: workspaceName,
        authorId: existingUser.id,
      },
    });

    // Обработка успешного создания рабочего пространства
    return res.status(200).json({ message: "Workspace created successfully", workspace });
  } catch (error) {
    handleError(error, res);
  }
};
