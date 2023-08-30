import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { handleError } from "../helpers/helpers";
import prisma from "../db";

export const uploadFile = async (req: any, res: Response) => {
  try {
    const { email } = req.userData;
    await prisma.$connect();
    if (!req.files || !req.files.File) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.files.File;

  } catch (error) {
    handleError(error, res);
  } finally {
    await prisma.$disconnect();
  }
};
