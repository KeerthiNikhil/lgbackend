import { Request, Response, NextFunction } from "express";

// ✅ GENERIC ROLE BASED (ADMIN etc.)
export const restrictTo =
  (...roles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  };

// ✅ VENDOR ONLY
export const restrictToVendor = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user?.isVendor) {
    return res.status(403).json({
      message: "Access denied. Vendor only.",
    });
  }

  next();
};