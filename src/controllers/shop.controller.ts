import { Request, Response } from "express";
import Shop from "../models/shop.model";

// Vendor creates shop
export const createShop = async (req: any, res: Response) => {
  try {
    const { name, description, address, latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const shop = await Shop.create({
      name,
      description,
      address,
      owner: req.user._id,
      location: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      },
    });

    res.status(201).json({
      message: "Shop created. Awaiting admin approval.",
      shop,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin approves shop
export const approveShop = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    res.json({
      message: "Shop approved",
      shop,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Get all approved shops
export const getApprovedShops = async (_req: Request, res: Response) => {
  try {
    const shops = await Shop.find({
      isApproved: true,
      isActive: true,
    }).populate("owner", "name email");

    res.json(shops);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



// Get shop by ID
export const getShopById = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.shopId)
      .populate("owner", "name email");

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.json(shop);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getNearbyShops = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude, distance = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Please provide latitude and longitude",
      });
    }

    const radius = Number(distance) * 1000; // convert km to meters

    const shops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)],
          },
          $maxDistance: radius,
        },
      },
      isApproved: true,
      isActive: true,
    });

    res.json(shops);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
