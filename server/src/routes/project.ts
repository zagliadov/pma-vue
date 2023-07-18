import express from "express";
const router = express.Router();
import { getProjects, addNewProject } from "../controllers/project";
import { verifyToken } from "../controllers/middleware";

router.post("/get_projects", verifyToken, getProjects);
router.post("/add_new_project", verifyToken, addNewProject);

export default router;