import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { handleError } from "../helpers/helpers";
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
  union,
  nullType,
  optional,
} from "valibot";
import { ITaskAssignee } from "./interfaces";
import fileUpload, { UploadedFile } from "express-fileupload";

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

export const createTask = async (req: any, res: Response) => {
  try {
    const { email, id } = req.userData;
    const { userData, projectId } = req.body;
    const taskFileArray: any = req?.files;
    const destinationPath = `${__dirname}/taskFiles/`;
    await Promise.all(
      _.map(taskFileArray, async (file) => {
        const newFileName = encodeURI(projectId + "-" + file.name);
        await file.mv(`${destinationPath}${newFileName}`);
      })
    );
    const task: TaskData = parse(TaskSchema, JSON.parse(userData));
    const newTask = await prisma.task.create({
      data: {
        name: task.taskName,
        status: task.taskStatus,
        description: task.taskDescription,
        projectId: Number(projectId),
      },
    });

    // Create an array of tasks to assign
    // The code creates an array called taskAssignees using await Promise.all(). This array contains an initial object with data related to the current user (userId, email, taskId, projectCreator, and isEmailConfirmed).
    // Additionally, it maps over the task.taskAssignee array, filtering out elements where the assignee.email is not equal to the current user's email. For each filtered element, it asynchronously queries the prisma.user database to find unique user data based on the assignee.email.
    // The mapped result is an array of objects, each containing information about an assignee for the task. This information includes the user's userId, email, taskId, projectCreator, and isEmailConfirmed.
    // In summary, taskAssignees is an array that combines the current user's information with information about other assignees for a task, fetched from the database. The resulting array is an important part of the task creation process.
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
    await Promise.all(
      _.map(taskAssignees, async (assignee) => {
        console.log(assignee);
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

    // Creating task file records
    await Promise.all(
      _.map(taskFileArray, async (file) => {
        await prisma.taskFile.create({
          data: {
            taskId: newTask.id,
            fileName: projectId + "-" + file.name,
          },
        });
      })
    );

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.log(error);
  }
};
