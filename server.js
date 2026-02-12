import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// serve images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api", imageRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
