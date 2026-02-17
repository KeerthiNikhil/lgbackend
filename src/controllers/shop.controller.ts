import Shop from "../models/shop.model";
import User from "../models/user.model";

export const createShop = async (req: any, res: any) => {
  try {
    const { name, description, location, coordinates } = req.body;

    const shop = await Shop.create({
      name,
      description,
      location,
      coordinates,
      owner: req.user.id,
      isApproved: false
    });

    // Upgrade user to vendor automatically
    await User.findByIdAndUpdate(req.user.id, {
      role: "vendor",
    });

    res.status(201).json({
      success: true,
      data: shop,
    });

  } catch (error: any) {
    console.error("SHOP ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyShops = async (req: any, res: any) => {
  try {
    const shops = await Shop.find({ owner: req.user.id });

    res.json({
      success: true,
      data: shops,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
