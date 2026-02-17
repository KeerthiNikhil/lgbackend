import express from "express";
import {createShop,getMyShops} from "../controllers/shop.controller";
import { protect } from "../middleware/protect.middleware";

const router = express.Router();

router.post("/", protect, createShop);
router.get("/my-shops", protect, getMyShops);


export default router;
