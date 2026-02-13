import express from "express";
import { protect } from "../middleware/protect.middleware";
import { restrictTo } from "../middleware/restrict.middleware";
import {
  requestVendorAccess,
  approveVendor,
} from "../controllers/vendor.controller";

const router = express.Router();

// Customer requests vendor role
router.post("/request", protect, restrictTo("customer"), requestVendorAccess);

// Admin approves vendor
router.put("/approve/:userId", protect, restrictTo("admin"), approveVendor);

export default router;
