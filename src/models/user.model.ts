import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  otp?: string;
  otpExpiry?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      default: "user",
    },

    otp: {
      type: String,
    },

    otpExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
