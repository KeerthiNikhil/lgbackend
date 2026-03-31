import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { placeOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", protect, placeOrder);

export default router;