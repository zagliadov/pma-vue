import express from "express";
const router = express.Router();
import { createTask } from "../controllers/task";
import { verifyToken } from "../controllers/middleware";

router.post("/create_task", verifyToken, createTask);

export default router;
