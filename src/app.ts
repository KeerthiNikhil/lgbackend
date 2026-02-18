import express from "express";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/product.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/products", productRoutes);

export default app;
