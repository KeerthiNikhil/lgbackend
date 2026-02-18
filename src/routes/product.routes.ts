import express from "express";
import Product from "../models/product.model";
import { upload } from "../middleware/upload";

const router = express.Router();


// ================= ADD PRODUCT =================
router.post("/", upload.array("images", 4), async (req, res) => {
  try {
    const imagePaths = req.files
      ? (req.files as Express.Multer.File[]).map(
          (file) => `http://localhost:5000/uploads/${file.filename}`
        )
      : [];

    const product = new Product({
      ...req.body,
      sizes: req.body.sizes ? req.body.sizes.split(",") : [],
      images: imagePaths,
    });

    await product.save();

    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ error });
  }
});


// ================= UPDATE PRODUCT =================
router.put("/:id", upload.array("images", 4), async (req, res) => {
  try {
    const imagePaths = req.files
      ? (req.files as Express.Multer.File[]).map(
          (file) => `http://localhost:5000/uploads/${file.filename}`
        )
      : [];

    const updateData: any = {
      ...req.body,
      sizes: req.body.sizes ? req.body.sizes.split(",") : [],
    };

    if (imagePaths.length > 0) {
      updateData.images = imagePaths;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({ message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ error });
  }
});


// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;

// ================= TOTAL PRODUCT COUNT =================
router.get("/count/total", async (req, res) => {
  try {
    const total = await Product.countDocuments();
    res.json({ totalProducts: total });
  } catch (error) {
    res.status(500).json({ message: "Failed to get count", error });
  }
});
