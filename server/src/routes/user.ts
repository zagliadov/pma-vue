import express from "express";
const router = express.Router();
import { uploadPhoto } from "../controllers/user";
import { verifyToken } from "../controllers/middleware";

router.post("/upload_photo", verifyToken, uploadPhoto);

export default router;