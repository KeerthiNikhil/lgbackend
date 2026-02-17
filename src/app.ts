import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

console.log("Auth routes loading...");

// routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

export default app;
