import { Request, Response } from "express";
import User from "../models/user.model";
import { generateOTP } from "../units/otp";
import jwt from "jsonwebtoken";

// ================= REGISTER =================

export const register = async (req: Request, res: Response) => {
  try {
    const { name, phone } = req.body;

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered. Please login.",
      });
    }

    const otp = generateOTP();

    const newUser = new User({
      name,
      phone,
      otp,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    await newUser.save();

    console.log("Registration OTP:", otp); // For testing

    res.json({
      message: "Registration successful",
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// ================= VERIFY REGISTER OTP =================

export const verifyRegisterOTP = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiry! < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Registration completed",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};
export const checkUser = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
        console.log("checkUser API called");  


    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    // 🔥 generate OTP for login
    const otp = generateOTP();

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    console.log("Login OTP:", otp); // show in terminal

    res.json({
      message: "OTP sent to your phone",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
