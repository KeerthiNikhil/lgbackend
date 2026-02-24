import express from "express";
import { getProductsByShop } from "../controllers/product.controller";

const router = express.Router();

router.get("/shop/:shopId", getProductsByShop);

export default router;
