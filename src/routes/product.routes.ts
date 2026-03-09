import express from "express";
import { protect } from "../middleware/auth.middleware";
import upload  from "../middleware/upload.middleware";
import multer from "multer";

import {
  createProduct,
  getProductsByShop,
  deleteProduct
} from "../controllers/product.controller";
import { getVendorProducts } from "../controllers/product.controller";
import { bulkUploadProducts } from "../controllers/product.controller";
import { getProductById } from "../controllers/product.controller";

const router = express.Router();

/* CREATE PRODUCT */

router.post(
  "/",
  protect,
  upload.array("images", 4),
  createProduct
);

/* PRODUCTS BY SHOP */

router.get(
  "/shop/:shopId",
  getProductsByShop
);
router.get("/vendor-products", protect, getVendorProducts);
router.get("/:id", getProductById);

router.delete("/:productId", protect, deleteProduct);

/* DELETE PRODUCT */

router.delete(
  "/:productId",
  protect,
  deleteProduct
);


router.post("/bulk-upload", upload.single("file"), bulkUploadProducts);

export default router;