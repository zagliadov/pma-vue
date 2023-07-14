import express from "express";
const router = express.Router();
import { createWorkspace } from "../controllers/workspace";
import { verifyToken } from "../controllers/middleware";

router.post("/create_workspace", verifyToken, createWorkspace);

export default router;