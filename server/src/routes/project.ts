import express from "express";
const router = express.Router();
import { getProjects } from "../controllers/project";
import { verifyToken } from "../controllers/middleware";

router.post("/get_projects", verifyToken, getProjects);

export default router;