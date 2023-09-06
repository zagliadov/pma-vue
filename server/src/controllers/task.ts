import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import prisma from "../db";
import * as _ from "lodash";
import {
  string,
  number,
  object,
  array,
  boolean,
  parse,
  nullable,
  optional,
} from "valibot";
import { ITaskAssignee } from "./interfaces";

type TaskData = {
  taskName: string;
  taskDescription: string;
  taskColor: string;
  taskStatus: string;
  taskAssignee: ITaskAssignee[];
};

// This schema combines two other schemas:
// string(), representing a string.
// nullable(), which makes the value null valid.
// optional(), which makes the value undefined valid.
const nullableString = nullable(optional(string()));

const TaskAssigneeSchema = array(
  object({
    id: number("ID"),
    email: string("email"),
    userId: number("userID"),
    projectCreator: boolean("projectCreator"),
    isEmailConfirmed: boolean("isEmailConfirmed"),
    avatar_filename: nullableString,
    firstName: nullableString,
    lastName: nullableString,
    name: nullableString,
  })
);

const TaskSchema = object({
  taskName: string(),
  taskDescription: string(),
  taskColor: string(),
  taskStatus: string(),
  taskAssignee: TaskAssigneeSchema,
});

const fileNameGenerator = (projectId: number, file: any) => {
  return `${projectId}-${file.name}`;
};

// Helper function to move files
const moveFiles = async (
  taskFileArray: any,
  destinationPath: string,
  projectId: number
) => {
  try {
    await Promise.all(
      _.map(taskFileArray, async (file) => {
        const newFileName = encodeURI(fileNameGenerator(projectId, file));
        await file.mv(`${destinationPath}${newFileName}`);
      })
    );
  } catch (error) {
    console.error("Error moving files:", error);
    throw new Error("Failed to move files");
  }
};

// Helper function to create task assignees
type assignee = {
  userId: number;
  email: string;
  taskId: number;
  projectCreator: boolean;
  isEmailConfirmed: boolean;
};
const createTaskAssignees = async (taskAssignees: assignee[]) => {
  try {
    await Promise.all(
      _.map(taskAssignees, async (assignee) => {
        await prisma.taskAssignee.create({
          data: {
            userId: assignee.userId,
            email: assignee.email,
            taskId: assignee.taskId,
            projectCreator: assignee.projectCreator,
            isEmailConfirmed: assignee.isEmailConfirmed,
          },
        });
      })
    );
  } catch (error) {
    console.error("Error creating task assignees:", error);
    throw new Error("Failed to create task assignees");
  }
};

const createNewTask = async (taskData: TaskData, projectId: number) => {
  const newTask = await prisma.task.create({
    data: {
      name: taskData.taskName,
      status: taskData.taskStatus,
      description: taskData.taskDescription,
      projectId: projectId,
    },
  });

  return newTask;
};

// Helper function to create task files
type newTask = {
  id: number;
  projectId: number;
};
const createTaskFiles = async (taskFileArray: any, newTask: newTask) => {
  try {
    await Promise.all(
      _.map(taskFileArray, async (file) => {
        await prisma.taskFile.create({
          data: {
            taskId: newTask.id,
            fileName: fileNameGenerator(newTask.projectId, file),
          },
        });
      })
    );
  } catch (error) {
    console.error("Error creating task files:", error);
    throw new Error("Failed to create task files");
  }
};

export const createTask = async (req: any, res: Response) => {
  try {
    const { email, id } = req.userData;
    const { userData, projectId } = req.body;
    const taskFileArray: any = req?.files;
    const destinationPath = `${__dirname}/taskFiles/`;
    await moveFiles(taskFileArray, destinationPath, projectId);
    const task: TaskData = parse(TaskSchema, JSON.parse(userData));
    const newTask = await createNewTask(task, Number(projectId));

    // Create an array of task assignees by combining the current user's information and information about other assignees.
    // The code starts by creating an array called taskAssignees, which includes an initial object with data related to the current user (userId, email, taskId, projectCreator, and isEmailConfirmed).
    // Then, it maps over the task.taskAssignee array, filtering out elements where the assignee.email is not equal to the current user's email.
    // For each filtered element, it asynchronously queries the prisma.user database to find unique user data based on the assignee.email.
    // The mapped result is an array of objects, each containing information about an assignee for the task, including userId, email, taskId, projectCreator, and isEmailConfirmed.
    // This array is a crucial part of the task creation process.
    const taskAssignees = await Promise.all([
      {
        userId: id,
        email: email,
        taskId: newTask.id,
        projectCreator: true,
        isEmailConfirmed: true,
      },
      ..._.map(
        _.filter(task.taskAssignee, (assignee) => assignee.email !== email),
        async (assignee) => {
          const assigneeUser = await prisma.user.findUnique({
            where: { email: assignee.email },
          });

          return {
            userId: assignee.userId,
            email: assignee.email,
            taskId: newTask.id,
            projectCreator: false,
            isEmailConfirmed: assigneeUser ? true : false,
          };
        }
      ),
    ]);

    // Creating Assigned User Records
    await createTaskAssignees(taskAssignees);
    // Creating task file records
    await createTaskFiles(taskFileArray, newTask);

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};
