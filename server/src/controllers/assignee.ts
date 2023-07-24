import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";
import { getProjectAssigneeByEmail, getProjectById } from "./query";

export const getAssigneeProjects = async (req: any, res: Response) => {
  const { email, id } = req.userData;
  const isUserAssignee = await getProjectAssigneeByEmail(email);
  if (!isUserAssignee) return;
  const { projectId } = isUserAssignee;
  const assigneeProject = await getProjectById(projectId);


  console.log(assigneeProject, "===============>isUserAssignee");
}