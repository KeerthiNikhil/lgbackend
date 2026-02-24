import { Request, Response } from "express";
import Vendor from "../models/vendor.model";

// ================= CREATE / UPDATE PROFILE =================
export const updateVendorProfile = async (req: Request, res: Response) => {
  try {
    const { shopName, ownerName, email, phone, gstNumber, address } = req.body;

    const vendor = await Vendor.findOneAndUpdate(
      { phone },  // identify vendor by phone
      {
        shopName,
        ownerName,
        email,
        gstNumber,
        address,
      },
      { new: true, upsert: true } // create if not exist
    );

    res.json({
      message: "Profile updated successfully",
      vendor,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

// ================= GET PROFILE =================
export const getVendorProfile = async (req: Request, res: Response) => {
  try {
    const { phone } = req.params;

    const vendor = await Vendor.findOne({ phone });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json(vendor);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
