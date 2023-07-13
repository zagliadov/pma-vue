import express from "express";
const router = express.Router();
import { createWorkspace, verifyToken } from "../controllers/workspace";

router.post("/create_workspace", verifyToken, createWorkspace);

export default router;