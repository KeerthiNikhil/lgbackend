import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import { restrictTo } from "./middleware/restrict.middleware.js";
import vendorRoutes from "./routes/vendor.routes.js";
import shopRoutes from "./routes/shop.routes.js";
import productRoutes from "./routes/product.routes.js";
import { protect } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();   

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/vendor", vendorRoutes);
app.use("/api/v1/shops", shopRoutes);
app.use("/api/v1/products", productRoutes);

app.use("/uploads", express.static("uploads"));


app.get(
  "/api/admin-only",
  protect,
  restrictTo("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin 🚀" });
  }
);

app.get("/", (_req, res) => {
  res.json({ message: "Marketplace API Running 🚀" });
});

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed ❌", err);
  });
