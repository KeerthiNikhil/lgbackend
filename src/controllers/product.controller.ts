import Product from "../models/product.model.js";
import Shop from "../models/shop.model.js";

// ================= CREATE PRODUCT =================
export const createProduct = async (req: any, res: any) => {
  try {
    const { name, description, price, stock, shopId } = req.body;

    // Check shop belongs to vendor
    const shop = await Shop.findOne({
      _id: shopId,
      owner: req.user.id,
    });

    if (!shop) {
      return res.status(403).json({
        success: false,
        message: "You cannot add product to this shop",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      shop: shopId,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: product,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET MY PRODUCTS =================
export const getMyProducts = async (req: any, res: any) => {
  try {
    const products = await Product.find({
      owner: req.user.id,
    }).populate("shop", "name");

    res.json({
      success: true,
      data: products,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req: any, res: any) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllProducts = async (req: any, res: any) => {
  try {
    const { search } = req.query;

    let query: any = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getProductsByShop = async (req: any, res: any) => {
  try {
    const products = await Product.find({
      shop: req.params.shopId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: products,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const searchProducts = async (req: any, res: any) => {
  try {
    const keyword = req.query.keyword;

    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
    });

    res.json({
      success: true,
      data: products,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
