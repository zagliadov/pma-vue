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

export const addNewProject = async (req: any, res: Response) => {
  const { email } = req.userData;
  const { workspaceId, projectName, projectMembers, projectDescription } =
    req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const project = await prisma.project.create({
      data: {
        name: projectName,
        description: projectDescription,
        workspaceId,
      },
    });
    const projectId: number = project.id;
    interface IProjectAssignees {
      userId: number,
      projectId: number
    }
    const projectAssignees: IProjectAssignees[] = [];

    for (const member of projectMembers) {
      const memberUser = await prisma.user.findUnique({
        where: { email: member },
      });
      if (memberUser) {
        projectAssignees.push({
          userId: memberUser.id,
          projectId: projectId,
        });
      }
    }
    for (const assignee of projectAssignees) {
      await prisma.projectAssignee.create({
        data: {
          userId: assignee.userId,
          projectId: assignee.projectId,
        },
      });
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
