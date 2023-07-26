import express from "express";
const router = express.Router();
import { getProjects, addNewProject, getProject } from "../controllers/project";
import { verifyToken } from "../controllers/middleware";

router.post("/get_projects", verifyToken, getProjects);
router.post("/add_new_project", verifyToken, addNewProject);
router.post("/get_project", verifyToken, getProject);

export default router;