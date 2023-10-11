import dotenv from "dotenv";
dotenv.config();
import { Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { handleError } from "../helpers/helpers";
import prisma from "../db";

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
      process.env.SECRET as string
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
    handleError(error, res);
  }
};

export const checkEmailMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.userData;
  const { newAssigneeEmail } = req.body;
  try {
    if (newAssigneeEmail !== email) {
      next();
    } else {
      res.status(409).json({
        message:
          "You are trying to add your email to a project of which you are the publisher.",
      });
    }
  } catch (error) {
    console.error("Error in checkEmail handler:", error);
    throw new Error("Error in checkEmail handler");
  }
};

export const isAssigneeMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { projectId, newAssigneeEmail } = req.body;
  try {
    await prisma.$connect();
    const isAssignee = await prisma.projectAssignee.findFirst({
      where: {
        projectId: projectId,
        email: newAssigneeEmail,
      },
    });
    if (isAssignee) {
      res
        .status(409)
        .json({ message: "User is already a successor for this project." });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in isAssigneeMiddleware handler:", error);
    throw new Error("Error in isAssigneeMiddleware handler");
  } finally {
    await prisma.$disconnect();
  }
};
