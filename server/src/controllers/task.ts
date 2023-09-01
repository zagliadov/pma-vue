import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { handleError } from "../helpers/helpers";
import prisma from "../db";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userData, projectId, email } = req.body;
    const taskFileArray = req?.files;
    console.log(taskFileArray, "OOOOOOOOOOOOO");
    console.log(userData, "userData.taskAssignee====================>")
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
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the task" });
  }
};
