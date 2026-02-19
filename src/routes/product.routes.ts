import express from "express";
import multer from "multer";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getMyProducts,
  getProductsByShop,
  getAllProducts,
} from "../controllers/product.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/* ================= PUBLIC ROUTES ================= */

// Get all products
router.get("/", getAllProducts);

// Get products by shop
router.get("/shop/:shopId", getProductsByShop);
router.get("/search", searchProducts);

/* ================= VENDOR ROUTES ================= */

router.use(protect, restrictTo("vendor"));

// Create
router.post("/", upload.array("images", 4), createProduct);

// My products
router.get("/my-products", getMyProducts);

// Update
router.put("/:id", upload.array("images", 4), updateProduct);

// Delete
router.delete("/:id", deleteProduct);

export default router;
