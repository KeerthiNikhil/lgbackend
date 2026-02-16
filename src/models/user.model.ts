import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  email?: string;
  role: "customer" | "vendor" | "admin";
  isVerified: boolean;
  otp?: string;
  otpExpiry?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "customer",
    },

    otp: String,

    otpExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
