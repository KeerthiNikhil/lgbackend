import { Request, Response } from "express";
import Product from "../models/product.model";

export const getProductsByShop = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find({
      shopId: req.params.shopId,
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};
