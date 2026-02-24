import express from "express";
import multer from "multer";
import { getAllShops, createShop } from "../controllers/shop.controller";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", upload.single("shopImage"), createShop);
router.get("/", getAllShops);

export default router;
