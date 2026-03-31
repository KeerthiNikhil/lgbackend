import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken.js";

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, phone} = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const existing = await User.findOne({ phone });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Phone already registered",
      });
    }

    const user = await User.create({
      name,
      phone
    });

    res.json({
      success: true,
      message: "User registered successfully",
      data: user,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ================= SEND OTP ================= */
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    console.log("🔥 OTP for", phone, ":", otp);

    res.json({
      success: true,
      message: "OTP sent (check backend console)",
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (req, res) => {
  const { phone, otp, name } = req.body;

  try {
    // 👉 1. VERIFY OTP (your existing logic)
    // Example (adjust based on your OTP logic)
    if (otp !== "1234") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 👉 2. CHECK USER EXISTS
    let user = await User.findOne({ phone });

    // 👉 3. IF NOT EXISTS → CREATE USER
    if (!user) {
      user = await User.create({
        name: name || "User",
        phone,
        role: "user", // default role
      });
    }

    // 👉 4. GENERATE TOKEN
    const token = generateToken(user._id.toString());

    // 👉 5. RETURN RESPONSE
    res.json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};