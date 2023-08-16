import express from "express";
const router = express.Router();
import { getAssigneeProjects } from "../controllers/assignee";
import { verifyToken } from "../controllers/middleware";

router.post("/get_assignee_projects", verifyToken, getAssigneeProjects);
export default router;
