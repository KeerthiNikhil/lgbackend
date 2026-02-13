import { Request, Response } from "express";
import User from "../models/user.model";

// Customer requests vendor access
export const requestVendorAccess = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "vendor") {
      return res.status(400).json({ message: "Already a vendor" });
    }

    user.isVendorRequested = true;
    await user.save();

    res.json({ message: "Vendor request submitted" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
export const approveVendor = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "vendor";
    user.isVendorRequested = false;

    await user.save();

    res.json({ message: "User promoted to vendor" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
