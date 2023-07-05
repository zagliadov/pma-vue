import { Response } from "express";

export const handleError = (error: unknown, res: Response) => {
  console.log(error);
  res.status(500).json({ error: "Internal server error" });
};