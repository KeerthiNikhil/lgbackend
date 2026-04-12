import express from "express";
import { sendOtp, verifyOtp, getMe } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { createRazorpayOrder } from "../controllers/order.controller";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.get("/me", protect, getMe); // 
router.post("/create-razorpay-order", createRazorpayOrder);

export default router;