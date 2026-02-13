import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", (req, res) => {
  res.json({ message: "Login route working" });
});
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
