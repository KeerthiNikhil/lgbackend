import Shop from "../models/shop.model.js";

export const createShop = async (req: any, res: any) => {
  try {
    const { name, description } = req.body;

    const shop = await Shop.create({
      name,
      description,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: shop,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
