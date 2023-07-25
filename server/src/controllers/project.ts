import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

export const getProjects = async (req: any, res: Response) => {
  const { email, id } = req.userData;
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
    const projectAssignees = await prisma.projectAssignee.findMany({
      where: {
        userId: id,
      },
      include: {
        project: {
          include: {
            workspace: true,
            tasks: true,
          },
        },
      },
    });
    return res.status(200).json({ projects, projectAssignees });
  } catch (error) {
    handleError(error, res);
  }
};

export const addNewProject = async (req: any, res: Response) => {
  const { email, id } = req.userData;
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
      userId: number;
      email: string;
      projectId: number;
      projectCreator: boolean;
      isEmailConfirmed: boolean;
    }
    const projectAssignees: IProjectAssignees[] = [];
    projectAssignees.push({
      userId: id,
      email: email,
      projectId: projectId,
      projectCreator: true,
      isEmailConfirmed: true,
    });
    for (const member of projectMembers) {
      // If the project creator has specified his email address, then ignore this email
      if (member !== email) {
        const memberUser = await prisma.user.findUnique({
          where: { email: member },
        });
        projectAssignees.push({
          userId: memberUser ? memberUser.id : 0,
          email: memberUser ? memberUser.email : member,
          projectId: projectId,
          projectCreator: false,
          isEmailConfirmed: memberUser ? true : false,
        });
      }
    }
    for (const assignee of projectAssignees) {
      await prisma.projectAssignee.create({
        data: {
          userId: assignee.userId,
          email: assignee.email,
          projectId: assignee.projectId,
          projectCreator: assignee.projectCreator,
          isEmailConfirmed: assignee.isEmailConfirmed,
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
