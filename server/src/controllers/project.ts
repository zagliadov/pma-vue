import dotenv from "dotenv";
dotenv.config();
import { Prisma } from ".prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

export const getProjects = async (req: any, res: Response) => {
  const { email } = req.userData;
  const { workspaceId } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const projects = await prisma.project.findMany({
      where: {
        workspaceId: workspaceId,
      },
    });
    return res.status(200).json({ projects });
  } catch (error) {
    handleError(error, res);
  }
};