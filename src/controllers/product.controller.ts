import Product from "../models/product.model";
import Shop from "../models/shop.model";

/* ================= CREATE PRODUCT ================= */

export const createProduct = async (req: any, res: any) => {

  try {

    const userId = req.user._id;

    const {
      name,
      description,
      price,
      stock,
      category,
      discountType,
      discountValue,
      shop,

      expiryDate,
      weight,
      size,
      brand,
      warranty,
      modelNumber,
      manufacturer,
      skinType,
      author,
      ageGroup,
      material
    } = req.body;

    /* VERIFY SHOP BELONGS TO VENDOR */

    const shopData = await Shop.findOne({
      _id: shop,
      owner: userId
    });

    if (!shopData) {
      return res.status(403).json({
        success: false,
        message: "Invalid shop selection"
      });
    }

    /* HANDLE MULTIPLE IMAGES */

    const images: string[] = [];

    if (req.files && Array.isArray(req.files)) {

      req.files.forEach((file: any) => {
        images.push(`/uploads/${file.filename}`);
      });

    }

    /* CREATE PRODUCT */

    const product = await Product.create({

      name,
      description,

      price: Number(price),
      stock: Number(stock),

      category,

      discountType,
      discountValue: Number(discountValue || 0),

      shop,

      images,

      expiryDate,
      weight,
      size,
      brand,
      warranty,
      modelNumber,
      manufacturer,
      skinType,
      author,
      ageGroup,
      material

    });

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (error: any) {

    console.log("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

/* ================= DELETE PRODUCT ================= */

export const deleteProduct = async (req: any, res: any) => {

  try {

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {

      return res.status(404).json({
        success: false,
        message: "Product not found"
      });

    }

    await Product.findByIdAndDelete(productId);

    res.json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

/* ================= GET PRODUCTS BY SHOP ================= */

export const getProductsByShop = async (req: any, res: any) => {

  try {

    const { shopId } = req.params;

    const products = await Product.find({
      shop: shopId,
      isActive: true
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });

  } catch (error: any) {

    console.log("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};