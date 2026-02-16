import express from "express";
import multer from "multer";
import Product from "../models/product.model";

const router = express.Router();

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= ADD PRODUCT =================
router.post("/", upload.array("images", 4), async (req, res) => {
  try {
    const imageUrls = (req.files || []).map(
      (file) =>
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      specification: req.body.specification,
      category: req.body.category,
      subCategory: req.body.subCategory,
      price: Number(req.body.price),
      discountPrice: Number(req.body.discountPrice) || 0,
      discountPercent: Number(req.body.discountPercent) || 0,
      inStock: req.body.inStock === "true",
      sizes: req.body.sizes ? req.body.sizes.split(",") : [],
      images: imageUrls,
      shop: req.body.shop,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= UPDATE PRODUCT =================
router.put("/:id", upload.array("images", 4), async (req, res) => {
  try {
    const imageUrls = (req.files || []).map(
      (file) =>
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );

    const updateData = {
      name: req.body.name,
      description: req.body.description,
      specification: req.body.specification,
      category: req.body.category,
      subCategory: req.body.subCategory,
      price: Number(req.body.price),
      discountPrice: Number(req.body.discountPrice) || 0,
      discountPercent: Number(req.body.discountPercent) || 0,
      inStock: req.body.inStock === "true",
      sizes: req.body.sizes ? req.body.sizes.split(",") : [],
    };

    if (imageUrls.length > 0) {
      updateData.images = imageUrls;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    const formatted = products.map((p) => ({
      id: p._id,
      name: p.name,
      price: p.discountPrice || p.price,
      originalPrice: p.discountPrice ? p.price : undefined,
      image: p.images?.[0] || "",
      rating: 4,
      reviews: 120,
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
       });
  }
});

// ================= GET PRODUCTS BY SHOP =================
router.get("/shop/:shopId", async (req, res) => {
  try {
    const products = await Product.find({
      shop: req.params.shopId,
    }).sort({ createdAt: -1 });

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
});



export default router;
