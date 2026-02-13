import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "vendor" | "customer";
  phone?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "vendor", "customer"],
      default: "customer",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
