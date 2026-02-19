import Shop from "../models/shop.model";
import User from "../models/user.model";

export const createShop = async (req: any, res: any) => {
  try {
    const vendorId = req.user.id; // from auth middleware

    const shop = await Shop.create({
      ...req.body,
      vendorId,
    });

    res.status(201).json({
      message: "Shop created successfully",
      shop,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating shop", error });
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
export const seedDummyShops = async (req: any, res: any) => {
  try {
    const dummyShops = [
      {
        name: "Fresh Mart",
        description: "Daily grocery & vegetables",
        address: "Balmatta, Mangalore",
        location: {
          type: "Point",
          coordinates: [74.8560, 12.9141],
        },
        owner: req.user._id,
        isApproved: true,
      },
      {
        name: "Tech World",
        description: "Electronics & gadgets",
        address: "Hampankatta, Mangalore",
        location: {
          type: "Point",
          coordinates: [74.8420, 12.8700],
        },
        owner: req.user._id,
        isApproved: true,
      },
    ];

    const created = await Shop.insertMany(dummyShops);

    res.json({
      success: true,
      message: "Dummy shops added",
      data: created,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
