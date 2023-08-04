import express from "express";
const router = express.Router();
import { uploadPhoto, downloadPhoto, removeAvatarFilename } from "../controllers/user";
import { verifyToken } from "../controllers/middleware";

router.post("/upload_photo", verifyToken, uploadPhoto);
router.get("/user_avatar/:image_name", downloadPhoto);
router.post("/remove_avatar_filename", verifyToken, removeAvatarFilename);

export default router;