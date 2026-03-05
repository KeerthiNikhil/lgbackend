import Shop from "../models/shop.model";
import User from "../models/user.model";

export const createShop = async (req: any, res: any) => {
  try {

    const userId = req.user._id;

    const {
      shopName,
      ownerName,
      businessType,
      description,
      email,
      phone,
      address,
      latitude,
      longitude,
      gstNumber,
      udyamNumber,
      fssaiNumber,
      tradeLicenseNumber
    } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Location required",
      });
    }

    const shopImage = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const shop = await Shop.create({
      owner: userId,
      shopName,
      ownerName,
      businessType,
      description,
      email,
      phone,
      address,
      gstNumber,
      udyamNumber,
      fssaiNumber,
      tradeLicenseNumber,
      shopImage,
      location: {
        type: "Point",
        coordinates: [
          parseFloat(longitude),
          parseFloat(latitude),
        ],
      },
    });

    await User.findByIdAndUpdate(userId, {
      role: "vendor",
    });

    res.status(201).json({
      success: true,
      data: shop,
    });

  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================= GET ALL VENDOR SHOPS ================= */

export const getMyShops = async (req: any, res: any) => {
  try {

    const shops = await Shop.find({ owner: req.user._id });

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
export const getVendorShops = async (req: any, res: any) => {
  try {

    const shops = await Shop.find({
      owner: req.user._id
    }).select("_id shopName");

    res.json({
      success: true,
      data: shops
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};