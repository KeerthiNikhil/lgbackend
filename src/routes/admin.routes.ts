import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/restrict.middleware.js";
import { getAdminDashboardStats } from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  restrictTo("admin"),
  getAdminDashboardStats
);

export default router;