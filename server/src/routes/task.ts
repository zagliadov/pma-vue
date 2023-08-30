import express from "express";
const router = express.Router();
import { verifyToken } from "../controllers/middleware";
import { uploadFile } from "../controllers/task";

router.post("/upload_file", verifyToken, uploadFile);

export default router;
