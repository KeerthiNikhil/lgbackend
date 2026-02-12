import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },

    // Forgot password
    otp: String,
    otpExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
