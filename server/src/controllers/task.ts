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

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userData, projectId, email } = req.body;
    const taskFileArray: any = req?.files;
    // const destinationPath = `${__dirname}/taskFiles/`;
    // _.forEach(taskFileArray, async (file) => {
    //   const newFileName = encodeURI(projectId + "-" + file.name);
    //   await file.mv(`${destinationPath}${newFileName}`);
    // });
    const task: TaskData = parse(TaskSchema, JSON.parse(userData));
    const newTask = await prisma.task.create({
      data: {
        name: task.taskName,
        status: task.taskStatus,
        description: task.taskDescription,
        projectId: Number(projectId),
      },
    });
    let newTaskAssignee
    _.forEach(task.taskAssignee, async (assignee) => {
      console.log(assignee);
      newTaskAssignee = await prisma.taskAssignee.create({
        data: {
          userId: assignee.userId,
          email: assignee.email,
          taskId: newTask.id,
        },
      });
    });
    console.log(newTaskAssignee);

    // for (const file of taskFileArray) {
    //   const uploadedFile = await prisma.taskFile.create({
    //     data: {
    //       taskId: task.id,
    //       fileName: file.name,
    //     },
    //   });
    // }

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.log(error);
  }
};
