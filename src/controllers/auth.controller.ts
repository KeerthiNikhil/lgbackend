import { Request, Response } from "express";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";

// ✅ SEND OTP
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phone, name } = req.body;

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        name: name || "User",
        role: "user",
      });
    }

    const otp = "1234";

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    await user.save();

    console.log("🔥 OTP:", otp);

    res.json({
      success: true,
      message: "OTP sent",
    });

  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// ✅ VERIFY OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phone, otp, name, type } = req.body;

    if (otp !== "1234") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        name: name || "User",
        role: "user",
      });
    }

    // 🔥 upgrade to vendor
    if (type === "vendor") {
      user.role = "vendor";
      await user.save();
    }

    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      user,
      isVendor: user.role === "vendor",
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMe = async (req: any, res: any) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user",
    });
  }
};