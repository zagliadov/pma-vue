import express from "express";
const router = express.Router();
import { createAccount, login, verifyToken } from "../controllers/auth";

router.post("/create_account", createAccount);
router.post("/login", login);
router.post("/verify_token", verifyToken);

export default router;