import { Project, ProjectAssignee } from "@prisma/client";
import prisma from "../db";

export const getProjectAssigneeByEmail = async (
  email: string
): Promise<ProjectAssignee[] | null> => {
  try {
    const isUserAssignee = await prisma.projectAssignee.findMany({
      where: { email },
    });

    return isUserAssignee;
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (
  projectId: number | null
): Promise<Project | null> => {
  try {
    if (projectId) {
      const assigneeProject = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
      });

      return assigneeProject;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const getProjectsAndWorkspaceIdsByEmail = async (
  email: string
): Promise<ProjectAssignee[]> => {
  try {
    const assigneeProjects = await prisma.projectAssignee.findMany({
      where: { email },
      include: {
        project: {
          include: {
            workspace: true,
          },
        },
      },
    });

    return assigneeProjects;
  } catch (error) {
    throw error;
  }
};