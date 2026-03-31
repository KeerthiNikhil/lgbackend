import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const placeOrder = async (req: any, res: any) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ Convert cart → order products
    const products = cart.items.map((item: any) => ({
      product: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    // 🧠 total calculation
    const totalAmount = cart.items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    // ⚠️ TEMP: take shop from first product (improve later)
    const shop = cart.items[0]?.shop;

if (!shop) {
  return res.status(400).json({
    message: "Shop not found in cart",
  });
}

console.log("CART ITEMS:", cart.items);
console.log("SHOP VALUE:", shop);

    const order = await Order.create({
      user: req.user.id,
      shop,
      products,
      totalAmount,
      status: "pending",
    });

    // ✅ CLEAR CART AFTER ORDER
    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: "Order placed successfully 🎉",
      order,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order failed" });
  }
};