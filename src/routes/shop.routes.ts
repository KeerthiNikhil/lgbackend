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
router.post("/", protect, restrictTo("vendor"), createShop);

// Admin approves shop
router.put("/:id/approve", protect, restrictTo("admin"), approveShop);

// Public routes
router.get("/", getApprovedShops);
router.get("/:shopId", getShopById);
router.get("/nearby/search", getNearbyShops);


export default router;
