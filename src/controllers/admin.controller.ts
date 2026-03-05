import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    // Total Revenue (only delivered orders)
    const deliveredOrders = await Order.find({ status: "Delivered" });

    const totalRevenue = deliveredOrders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    // Active Products
    const activeProducts = await Product.countDocuments({ isActive: true });

    // Total Reviews
    const totalReviews = await Review.countDocuments();

    // Active Vendors
    const activeVendors = await User.countDocuments({
      role: "vendor",
      isActive: true,
    });

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        activeProducts,
        totalReviews,
        activeVendors,
      },
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};