import { Request, Response } from "express";
import Product from "../models/product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isActive: true });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
