import express from "express";
import { protect } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

import {
  createProduct,
  getProductsByShop,
  deleteProduct
} from "../controllers/product.controller";

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

/* DELETE PRODUCT */

router.delete(
  "/:productId",
  protect,
  deleteProduct
);

export default router;