import express from "express";
const router = express.Router();
import { createAccount } from "../controllers/auth";

router.post("/create_account", createAccount);
// router.post("/login", login);
// router.route("/verifytoken").post(verifyToken);

export default router;