import express from "express";
import {
  createShop,
  approveShop,
  getApprovedShops,
  getShopById,
} from "../controllers/shop.controller";
import { protect } from "../middleware/protect.middleware";
import { restrictTo } from "../middleware/restrict.middleware";
import { getNearbyShops } from "../controllers/shop.controller";


const router = express.Router();

// Vendor creates shop
router.post("/", createShop);

// Admin approves shop
router.put("/:id/approve", protect, restrictTo("admin"), approveShop);

// Public routes
router.get("/", getApprovedShops);
router.get("/nearby/search", getNearbyShops);
router.get("/:shopId", getShopById);


export default router;
