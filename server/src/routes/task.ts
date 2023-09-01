import express from "express";
const router = express.Router();
import { createTask } from "../controllers/task";

router.post("/create_task", createTask);

export default router;
