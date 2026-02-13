import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middleware/protect.middleware";
import { restrictTo } from "./middleware/restrict.middleware";
import vendorRoutes from "./routes/vendor.routes";


dotenv.config();

const app = express();   

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/vendor", vendorRoutes);  
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
