import express from "express";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";  
import vendorRoutes from "./routes/vendor.routes";
import shopRoutes from "./routes/shop.routes";
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/uploads", express.static("uploads"));
// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);  
app.use("/api/vendor", vendorRoutes);

app.use("/api/shops", shopRoutes);
export default app;
