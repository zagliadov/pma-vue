import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { handleError } from "../helpers/helpers";
import { getProjectAssigneeByEmail, getProjectById } from "./query";
import prisma from "../db";

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
