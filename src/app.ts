import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRoutes from "./routes/admin.routes";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/v1/admin", adminRoutes);

// DB
mongoose.connect("mongodb://127.0.0.1:27017/vyoma");

// SERVER
app.listen(8000, () => {
  console.log("Server running on port 8000");
});