import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

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
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};