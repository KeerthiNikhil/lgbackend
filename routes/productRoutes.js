import express from "express";
import multer from "multer";
import Product from "../models/Product.js";

const router = express.Router();

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // lgbackend/uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= ADD PRODUCT =================
router.post(
  "/products",
  upload.array("images", 4),
  async (req, res) => {
    try {
      console.log("====== IMAGE UPLOAD CHECK ======");
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);
      console.log("================================");

      res.status(200).json({
        message: "Check logs",
        filesCount: req.files ? req.files.length : 0,
      });
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  }
);
router.put(
  "/products/:id",
  upload.array("images", 4),
  async (req, res) => {
    try {
      console.log("===== UPDATE PRODUCT =====");
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

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

      // ✅ ONLY update images if new images selected
      if (imageUrls.length > 0) {
        updateData.images = imageUrls;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("UPDATE ERROR:", error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);






// ================= GET ALL PRODUCTS =================
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= EXPORT (VERY IMPORTANT) =================
export default router;
