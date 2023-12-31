import express from "express";
const router = express.Router();
import {
  getProjects,
  addNewProject,
  getProject,
  getTotalProjectCount,
  getAllProjects,
  editProjectName,
  deleteProject,
} from "../controllers/project";
import { verifyToken } from "../controllers/middleware";

router.post("/get_projects", verifyToken, getProjects);
router.post("/add_new_project", verifyToken, addNewProject);
router.post("/get_project", verifyToken, getProject);
router.post("/get_total_project_count", verifyToken, getTotalProjectCount);
router.post("/get_all_projects", verifyToken, getAllProjects);
router.post("/edit_project_name", editProjectName);
router.delete("/delete_project/:projectId", verifyToken, deleteProject);

export default router;
