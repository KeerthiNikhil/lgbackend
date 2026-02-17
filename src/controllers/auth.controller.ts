import User from "../models/user.model";
import generateToken from "../utils/generateToken";

let otpStore: { [key: string]: string } = {};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      phone,
      role: "user",
    });

    res.status(201).json({ success: true, user });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// SEND OTP
export const sendOtp = async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;

  console.log(`🔥 OTP for ${phone}: ${otp}`);

  res.json({ success: true });
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const user = await User.findOne({ phone });

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user,
  });
};
