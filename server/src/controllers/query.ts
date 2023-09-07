import { User, Project, ProjectAssignee } from "@prisma/client";
import prisma from "../db";
import { IProject, IProjectAssignees } from "./interfaces";
import * as _ from "lodash";

export const getProjectAssigneeByEmail = async (
  email: string
): Promise<ProjectAssignee[] | null> => {
  try {
    await prisma.$connect();
    const isUserAssignee = await prisma.projectAssignee.findMany({
      where: { email },
    });

    return isUserAssignee;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getProjectById = async (
  projectId: number | null
): Promise<Project | null> => {
  try {
    await prisma.$connect();
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
  } finally {
    await prisma.$disconnect();
  }
};

export const getProjectsAndWorkspaceIdsByEmail = async (
  email: string
): Promise<ProjectAssignee[]> => {
  try {
    await prisma.$connect();
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
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserWithWorkspacesAndProjects = async (
  email: string
): Promise<User | null> => {
  try {
    await prisma.$connect();
    const userWithWorkspacesAndProjects = await prisma.user.findUnique({
      where: { email },
      include: {
        workspace: {
          include: {
            projects: true,
          },
        },
      },
    });

    return userWithWorkspacesAndProjects;
  } catch (error) {
    console.error("Error while getting user data:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Create project assignees in the database based on the provided data.
 *
 * @param {IProjectAssignees[]} projectAssignees - An array of objects representing project assignees.
 *
 * @throws {Error} Throws an error if the creation of project assignees fails.
 */
export const createProjectAssignees = async (
  projectAssignees: IProjectAssignees[]
): Promise<void> => {
  try {
    _.forEach(projectAssignees, async (assignee) => {
      await prisma.projectAssignee.create({
        data: {
          userId: assignee.userId,
          email: assignee.email,
          projectId: assignee.projectId,
          projectCreator: assignee.projectCreator,
          isEmailConfirmed: assignee.isEmailConfirmed,
        },
      });
    });
  } catch (error) {
    console.error("Error creating project assignees:", error);
    throw new Error("Failed to create project assignees");
  }
};

/**
 * Create a new project in the database.
 *
 * @param {string} projectName - The name of the new project.
 * @param {string} projectDescription - The description of the new project.
 * @param {number} workspaceId - The ID of the workspace to which the project belongs.
 *
 * @returns {Promise<Project>} - A Promise that resolves to the newly created Project object.
 */
export const createNewProject = async (
  projectName: string,
  projectDescription: string,
  workspaceId: number
): Promise<Project> => {
  try {
    const project = await prisma.project.create({
      data: {
        name: projectName,
        description: projectDescription,
        workspaceId,
      },
    });
    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};

/**
 * Retrieve projects by workspace ID from the database.
 *
 * @param {number} workspaceId - The ID of the workspace to filter projects by.
 *
 * @returns {Promise<Project[]>} - A Promise that resolves to an array of projects belonging to the specified workspace.
 */
export const getProjectsByWorkspaceId = async (
  workspaceId: number
): Promise<Project[]> => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        workspaceId: workspaceId,
      },
    });

    return projects;
  } catch (error) {
    console.error("Error retrieving projects by workspace ID:", error);
    throw new Error("Failed to retrieve projects by workspace ID");
  }
};

export const updateTaskAssigneeDetailsWithUsers = async (project: IProject | any) => {
  console.log(project)
  if (!project) {
    return; // Exit if there's no project
  }

  if (!project.tasks || !Array.isArray(project.tasks)) {
    return; // Exit if tasks are missing or not an array
  }

  await Promise.all(
    project.tasks.map(async (item: any) => {
      if (!item.taskAssignee || !Array.isArray(item.taskAssignee)) {
        return; // Exit if taskAssignee is missing or not an array
      }

      const userEmails = item.taskAssignee.map((assignee: any) => assignee.email);

      if (!userEmails.length) {
        return; // Exit if there are no user emails to look up
      }

      const users = await prisma.user.findMany({
        where: {
          email: { in: userEmails },
        },
        select: {
          avatar_filename: true,
          firstName: true,
          lastName: true,
          name: true,
          email: true,
          id: true,
        },
      });

      const combinedResults = item.taskAssignee.map((member: any) => {
        const matchingUser = users.find((user) => user.email === member.email);
        return matchingUser ? { ...member, ...matchingUser } : member;
      });

      item.taskAssignee = combinedResults;
    })
  );
}