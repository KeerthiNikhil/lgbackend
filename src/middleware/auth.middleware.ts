import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req: any, res: any, next: any) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - no token",
      });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    console.log("DECODED:", decoded);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    console.log("JWT ERROR:", error);
    return res.status(401).json({
      success: false,
      message: "Not authorized - invalid token",
    });
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }
    next();
  };
};
