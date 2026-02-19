import express from "express";
import { createShop, getMyShops, seedDummyShops } 
from "../controllers/shop.controller.js";
import { protect, restrictTo } 
from "../middleware/auth.middleware.js";

const router = express.Router();

// Create shop
router.post("/", protect, createShop);

// Get logged-in vendor shops
router.get("/my-shops", protect, getMyShops);

// Seed dummy shops
router.post(
  "/seed",
  protect,
  restrictTo("vendor"),
  seedDummyShops
);

export default router;
