import express from "express";
const router = express.Router();
import { uploadPhoto, downloadPhoto } from "../controllers/user";
import { verifyToken } from "../controllers/middleware";

router.post("/upload_photo", verifyToken, uploadPhoto);
router.get("/user_avatar/:image_name", downloadPhoto);

export default router;