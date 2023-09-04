import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { handleError } from "../helpers/helpers";
import prisma from "../db";
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
  optional
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
  taskAssignee: TaskAssigneeSchema
});

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userData, projectId, email } = req.body;
    console.log(JSON.parse(userData));
    const taskFileArray = req?.files;
    const task = parse(TaskSchema, JSON.parse(userData));
    console.log(taskFileArray, "OOOOOOOOOOOOO");
    console.log(task, "userData.taskAssignee====================>");
    // const task = await prisma.task.create({
    //   data: {
    //     name: userData.taskName,
    //     status: userData.taskStatus,
    //     description: userData.taskDescription,
    //     projectId: projectId,

    //   },
    // });

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
