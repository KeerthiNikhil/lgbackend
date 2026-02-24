import express from "express";
import { updateVendorProfile, getVendorProfile } from "../controllers/vendor.controller";

const router = express.Router();

router.post("/profile", updateVendorProfile);
router.get("/profile/:phone", getVendorProfile);

export default router;
