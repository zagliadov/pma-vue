import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

export const uploadPhoto = async (req: any, res: Response) => {
  try {
    console.log("UPLOADPHOTO");
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