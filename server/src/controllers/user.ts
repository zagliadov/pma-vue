import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import prisma from "../db";
import { getUserWithWorkspacesAndProjects } from "./query";
import { IUserData } from "./interfaces";

export const uploadPhoto = async (req: any, res: Response) => {
  const { email, id } = req.userData;
  try {
    await prisma.$connect();
    if (!req.files || !req.files.File) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.files.File;
    const newFileName = encodeURI(id + "-" + file.name);
    await file.mv(`${__dirname}/uploads/${newFileName}`);
    await prisma.user.update({
      where: { email },
      data: {
        avatar_filename: newFileName,
      },
    });
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        workspace: {
          include: {
            projects: true,
          },
        },
      },
    });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(200).json({ existingUser });
  } catch (error) {
    console.error("Error in uploadPhoto handler:", error);
    throw new Error("Error in uploadPhoto handler");
  } finally {
    await prisma.$disconnect();
  }
};

export const downloadPhoto = async (req: any, res: any) => {
  try {
    const imageName = req.params.image_name;
    res.sendFile(`${__dirname}/uploads/${imageName}`);
  } catch (error) {
    console.error("Error in downloadPhoto handler:", error);
    throw new Error("Error in downloadPhoto handler");
  }
};

export const removeAvatarFilename = async (
  req: any,
  res: Response
): Promise<void> => {
  try {
    await prisma.$connect();
    const { email } = req.userData;
    await prisma.user.update({
      where: { email },
      data: {
        avatar_filename: null,
      },
    });
    const existingUser = await getUserWithWorkspacesAndProjects(email);
    if (!existingUser) {
      res.status(400).json({ message: "User does not exist" });
    }
    res.status(200).json({ existingUser });
  } catch (error) {
    console.error("Error in removeAvatarFilename handler:", error);
    throw new Error("Error in removeAvatarFilename handler");
  } finally {
    await prisma.$disconnect();
  }
};

export const updatePersonalInformation = async (req: any, res: Response) => {
  try {
    const { email } = req.userData;
    const {
      firstName,
      lastName,
      userName,
      phoneNumber,
      language,
      timezone,
      startOfTheCalendarWeek,
      timeFormat,
      dateFormat,
    } = req.body;

    const dataToUpdate: IUserData = {};

    if (firstName !== "") dataToUpdate.firstName = firstName;
    if (lastName !== "") dataToUpdate.lastName = lastName;
    if (userName !== "") dataToUpdate.name = userName;
    if (phoneNumber !== "") dataToUpdate.phoneNumber = phoneNumber;
    if (language !== "") dataToUpdate.language = language;
    if (timezone !== "") dataToUpdate.timezone = timezone;
    if (startOfTheCalendarWeek !== "")
      dataToUpdate.startOfTheCalendarWeek = startOfTheCalendarWeek;
    if (timeFormat !== "") dataToUpdate.timeFormat = timeFormat;
    if (dateFormat !== "") dataToUpdate.dateFormat = dateFormat;

    await prisma.$connect();
    if (Object.keys(dataToUpdate).length > 0) {
      await prisma.user.update({
        where: { email },
        data: dataToUpdate,
      });
    }
    res.status(200).end();
  } catch (error) {
    console.error("Error in updatePersonalInformation handler:", error);
    throw new Error("Error in updatePersonalInformation handler");
  } finally {
    await prisma.$disconnect();
  }
};

export const checkProjectCreator = async (req: any, res: Response) => {
  const { email } = req.userData;
  const { projectId } = req.body;
  try {
    await prisma.$connect();
    const project = await prisma.projectAssignee.findFirst({
      where: {
        email: email,
        projectId: projectId,
      },
      select: {
        projectCreator: true,
      },
    });

    if (project && project.projectCreator) {
      res.status(200).json({ isProjectCreator: project.projectCreator });
    }
  } catch (error) {
    console.error("Error in checkProjectCreator handler:", error);
    throw new Error("Error in checkProjectCreator handler");
  } finally {
    await prisma.$disconnect();
  }
};
