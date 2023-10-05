import express from "express";
const router = express.Router();
import { uploadPhoto, downloadPhoto, removeAvatarFilename, updatePersonalInformation, checkProjectCreator } from "../controllers/user";
import { verifyToken } from "../controllers/middleware";

router.post("/upload_photo", verifyToken, uploadPhoto);
router.get("/user_avatar/:image_name", downloadPhoto);
router.post("/remove_avatar_filename", verifyToken, removeAvatarFilename);
router.post("/update_personal_information", verifyToken, updatePersonalInformation);
router.post("/check_project_creator", verifyToken, checkProjectCreator);

export default router;