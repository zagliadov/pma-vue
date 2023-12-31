import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";
import { IProjectAssignees, ITaskAssignee } from "./interfaces";
import { Project } from "@prisma/client";
import * as _ from "lodash";
import {
  createNewProject,
  createProjectAssignees,
  getAllProjectsByEmail,
  getProjectsByWorkspaceId,
  updateProjectAssigneeDetailsWithUsers,
  updateTaskAssigneeDetailsWithUsers,
} from "./query";

export const getAllProjects = async (req: any, res: Response) => {
  const { email } = req.userData;
  try {
    await prisma.$connect();
    const allProjects = await getAllProjectsByEmail(email);

    res.status(200).json({ allProjects });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const getTotalProjectCount = async (req: any, res: Response) => {
  const { email } = req.userData;
  try {
    await prisma.$connect();
    const allProjects = await getAllProjectsByEmail(email);
    const totalProjectsCount = allProjects.length;
    res.status(200).json({ totalProjectsCount });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const getProjects = async (req: any, res: Response) => {
  const { email } = req.userData;
  const { workspaceId } = req.body;

  try {
    await prisma.$connect();
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
  } finally {
    await prisma.$disconnect();
  }
};

export const getProject = async (req: any, res: Response) => {
  const { email } = req.userData;
  const { projectId } = req.body;

  try {
    await prisma.$connect();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (!projectId) return;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        tasks: {
          include: {
            taskAssignee: true,
            subtasks: true,
          },
        },
        projectAssignees: true,
      },
    });
    await updateTaskAssigneeDetailsWithUsers(project);
    await updateProjectAssigneeDetailsWithUsers(project);
    return res.status(200).json({ project });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const addNewProject = async (req: any, res: Response) => {
  const { email, id } = req.userData;
  const { workspaceId, projectName, projectMembers, projectDescription } =
    req.body;
  try {
    await prisma.$connect();
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const newProject: Project = await createNewProject(
      projectName,
      projectDescription,
      workspaceId
    );
    const projectId: number = newProject.id;

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
    await createProjectAssignees(projectAssignees);

    const projects = await getProjectsByWorkspaceId(workspaceId);
    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error in addNewProject handler:", error);
    throw new Error("Error in addNewProject handler");
  } finally {
    await prisma.$disconnect();
  }
};

export const editProjectName = async (req: Request, res: Response) => {
  try {
    const { newName, projectId } = req.body;
    await prisma.$connect();
    const project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name: newName,
      },
    });
    res.status(200).json({ project });
  } catch (error) {
    console.error("Error in editProjectName handler:", error);
    throw new Error("Error in editProjectName handler:");
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteProject = async (req: any, res: Response) => {
  try {
    const { projectId } = req.params;
    const { email } = req.userData;
    await prisma.$connect();
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
      include: {
        tasks: true,
        projectAssignees: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }
    await prisma.task.deleteMany({
      where: { projectId: project.id },
    });

    await prisma.projectAssignee.deleteMany({
      where: { projectId: project.id },
    });

    await prisma.project.delete({
      where: { id: Number(projectId) },
    });
    const allProjects = await getAllProjectsByEmail(email);
    res.status(200).json({ allProjects });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};
