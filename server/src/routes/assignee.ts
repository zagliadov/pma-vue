import express from "express";
const router = express.Router();
import {
  addAssigneeToProject,
  getAllAssignee,
  getAssigneeProjects,
  getProjectAssignees,
  removeProjectAssignee,
} from "../controllers/assignee";
import {
  verifyToken,
  checkEmailMiddleware,
  isAssigneeMiddleware,
} from "../controllers/middleware";

router.post("/get_assignee_projects", verifyToken, getAssigneeProjects);
router.post("/get_all_assignee", verifyToken, getAllAssignee);
router.get("/get_project_assignees/:project_id", getProjectAssignees);
router.delete(
  "/remove_assignee/:assignee_id/:assignee_email/from_project/:project_id",
  verifyToken,
  removeProjectAssignee
);
router.post(
  "/add_new_assignee_to_project",
  verifyToken,
  checkEmailMiddleware,
  isAssigneeMiddleware,
  addAssigneeToProject
);

export default router;
