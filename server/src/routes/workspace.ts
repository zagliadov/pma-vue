import express from "express";
const router = express.Router();
import { createWorkspace, getWorkspaces} from "../controllers/workspace";
import { verifyToken } from "../controllers/middleware";

router.post("/create_workspace", verifyToken, createWorkspace);
router.post("/get_workspaces", verifyToken, getWorkspaces);

export default router;