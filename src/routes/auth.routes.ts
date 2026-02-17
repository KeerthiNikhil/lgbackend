import express from "express";
import { register, verifyRegisterOTP, checkUser } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/verify-register", verifyRegisterOTP);
router.post("/check-user", checkUser);   // 🔥 THIS LINE MUST EXIST

export default router;
