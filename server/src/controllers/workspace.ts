import dotenv from "dotenv";
dotenv.config();
import { Prisma } from ".prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import { handleError } from "../helpers/helpers";

interface IDecodedToken {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers)
      return res
        .status(401)
        .json({ message: "There is no header in the request" });
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({
        message: "There is no mention of authorization in the header",
      });
    const token: string = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const decodedToken: JwtPayload | string = await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const expirationTime = (decodedToken as JwtPayload).exp;
    const currentTime = Date.now() / 1000;
    if (expirationTime && expirationTime < currentTime) {
      console.log("Token is not valid");
      return res.status(401).json({ message: "Authentication failed" });
    } else {
      req.userData = decodedToken as IDecodedToken;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

export const createWorkspace = (req: any, res: Response) => {
  const { id, email } = req.userData;
  const { workspaceName } = req.body;
  console.log(id, email, workspaceName, "====================> REQUEST");
};
