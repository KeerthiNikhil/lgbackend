import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    gstNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    profileImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema, "vendors");
