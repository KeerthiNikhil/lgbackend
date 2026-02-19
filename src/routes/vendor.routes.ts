import express from "express";
import { createShop } from "../controllers/vendor.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Vendor creates shop
router.post("/", protect, restrictTo("vendor"), createShop);

export default router;
