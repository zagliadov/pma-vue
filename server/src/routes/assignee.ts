import express from "express";
const router = express.Router();
import { getAllAssignee, getAssigneeProjects, getProjectAssignees } from "../controllers/assignee";
import { verifyToken } from "../controllers/middleware";

router.post("/get_assignee_projects", verifyToken, getAssigneeProjects);
router.post("/get_all_assignee", verifyToken, getAllAssignee);
router.get("/get_project_assignees/:project_id", getProjectAssignees)

export default router;
