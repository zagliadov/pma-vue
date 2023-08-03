import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

export const uploadPhoto = async (req: any, res: Response) => {
  const { email, id } = req.userData;
  try {
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
    handleError(error, res);
  }
};

export const downloadPhoto = async (req: any, res: any) => {
  try {
    const imageName = req.params.image_name;
    res.sendFile(`${__dirname}/uploads/${imageName}`);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};
