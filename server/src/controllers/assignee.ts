import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { handleError } from "../helpers/helpers";
import {
  createProjectAssignee,
  deleteAssigneeById,
  getProjectAssigneeByEmail,
  getProjectById,
} from "./query";
import prisma from "../db";

export const getAllAssignee = async (req: any, res: Response) => {
  const { email } = req.userData;
  try {
    await prisma.$connect();
    const members = await prisma.projectAssignee.findMany({
      where: {
        project: {
          workspace: {
            author: {
              email,
            },
          },
        },
      },
      distinct: ["email"], // Get unique project members by email.
      select: {
        id: true,
        email: true,
        userId: true,
        projectCreator: true,
        isEmailConfirmed: true,
      },
    });
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: members.map((member) => member.email), // In this case, users are selected whose email field is present in the array of emails obtained from the members array.
        },
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

    // Combining the results into one array.
    const combinedResults = members.map((member) => {
      const matchingUser = users.find((user) => user.email === member.email);
      return matchingUser ? { ...member, ...matchingUser } : member;
    });

    res
      .status(200)
      .json({ membersCount: combinedResults.length, combinedResults });
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

export const getProjectAssignees = async (req: Request, res: Response) => {
  try {
    const { project_id } = req.params;
    await prisma.$connect();
    if (!project_id) return res.end();
    let projectAssignees = await prisma.projectAssignee.findMany({
      where: {
        projectId: Number(project_id),
      },
    });
    const userIds = projectAssignees.map((assignee) => Number(assignee.userId));
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
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
    const combinedResults = projectAssignees.map((assignee) => {
      const matchingUser = users.find(
        (user) => user.id === Number(assignee.userId)
      );
      return matchingUser ? { ...assignee, ...matchingUser } : assignee;
    });

    res.status(200).json({ projectAssignees: combinedResults });
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const removeProjectAssignee = async (req: any, res: Response) => {
  try {
    const { email } = req.userData;
    const { project_id, assignee_id, assignee_email } = req.params;
    await prisma.$connect();
    const isProjectCreator = await prisma.projectAssignee.findFirst({
      where: {
        email: email,
        projectId: Number(project_id),
      },
    });
    if (!isProjectCreator || !isProjectCreator.projectCreator)
      return res.status(403).json({ message: "No access" });
    const projectAssignee = await prisma.projectAssignee.findFirst({
      where: {
        projectId: Number(project_id),
        userId: Number(assignee_id),
      },
    });
    if (projectAssignee) await deleteAssigneeById(projectAssignee.id);
    if (projectAssignee === null) {
      const unregisteredUser = await prisma.projectAssignee.findFirst({
        where: {
          projectId: Number(project_id),
          email: assignee_email,
        },
      });
      if (unregisteredUser === null)
        return res.status(404).json({
          message: `User not found in project with id: ${project_id}`,
        });
      await deleteAssigneeById(unregisteredUser.id);
      res.status(200).json({
        message: `The user has been successfully removed from the project with id: ${project_id}`,
      });
    }
  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};

export const addAssigneeToProject = async (
  req: any,
  res: Response
): Promise<void> => {
  const { projectId, newAssigneeEmail } = req.body;
  try {
    await prisma.$connect();
    const user = await prisma.user.findUnique({
      where: {
        email: newAssigneeEmail,
      },
    });
    if (!user) {
      await createProjectAssignee({
        userId: 0,
        email: newAssigneeEmail,
        projectId: projectId,
        projectCreator: false,
        isEmailConfirmed: false,
      });
    } else {
      await createProjectAssignee({
        userId: user.id,
        email: user.email,
        projectId: projectId,
        projectCreator: false,
        isEmailConfirmed: true,
      });
    }
    res.end();
  } catch (error) {
    console.error("Error in add assignee to project handler:", error);
    throw new Error("Error in add assignee to project handler");
  } finally {
    await prisma.$disconnect();
  }
};
