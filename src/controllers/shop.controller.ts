import { Request, Response } from "express";
import Shop from "../models/shop.model";

export const createShop = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shop = await Shop.create({
      shopName: req.body.shopName,
      shopType: req.body.shopType,
      location: req.body.location,
      vendorId: req.body.vendorId,
      shopImage: `http://localhost:5000/${req.file?.path}`,
    });

    res.status(201).json(shop);
  } catch (error) {
    res.status(500).json({ message: "Error creating shop" });
  }
};

export const getAllShops = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ message: "Error fetching shops" });
  }
};
