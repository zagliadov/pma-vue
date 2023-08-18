import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { handleError } from "../helpers/helpers";
import { getProjectAssigneeByEmail, getProjectById } from "./query";
import prisma from "../db";
import { ProjectAssignee } from "@prisma/client";
import { IMembers } from "./interfaces";

export const getAllAssignee = async (req: any, res: Response) => {
  const { email } = req.userData;
  try {
    await prisma.$connect();
    const members: { email: string }[] = await prisma.projectAssignee.findMany({
      where: {
        project: {
          workspace: {
            author: {
              email,
            },
          },
        },
        projectCreator: false, // Exclude projectCreator
      },
      distinct: ["email"], // Get unique assignee by email
      select: {
        email: true,
      },
    });
    
    const uniqueEmails = members.map((member) => member.email);
    const users: IMembers[] = await prisma.user.findMany({
      where: {
        email: {
          in: uniqueEmails,
        },
      },
      select: {
        avatar_filename: true,
        firstName: true,
        lastName: true,
        name: true,
        email: true,
      },
    });
    const missingEmails = uniqueEmails.filter((email) => !users.some((user) => user.email === email));
    missingEmails.forEach((email) => {
      users.push({email});
    });
    res.status(200).json({ membersCount: users.length, users });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const getAssigneeProjects = async (req: any, res: Response) => {
  const { email } = req.userData;
  try {
    // In the ProjectAssignee table, we are looking for a mention of email, we check whether we are the assignees of the project.
    const isUserAssignee = await getProjectAssigneeByEmail(email);
    if (!isUserAssignee) return;
    const assigneeProjects = [];
    for (const { projectId, projectCreator } of isUserAssignee) {
      // If the user has created a project, then we do not need a separate request to receive the project.
      if (!projectCreator) {
        assigneeProjects.push(await getProjectById(projectId));
      }
    }
    if (assigneeProjects.length > 0) {
      res.status(200).json({ assigneeProjects });
    }
  } catch (error) {
    handleError(error, res);
  }
};
