import Shop from "../models/shop.model.js";

export const createShop = async (req: any, res: any) => {
  try {
    const { name, description } = req.body;

    const shop = await Shop.create({
      name,
      description,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: shop,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/v1/orders/:id/assign-delivery

export const assignDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      deliveryBoy,
      deliveryBoyId,
      distance,
      rate,
      totalDeliveryCost,
    } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        deliveryBoy,
        deliveryBoyId,
        deliveryStatus: "Assigned",
        deliveryCost: totalDeliveryCost,
      },
      { new: true }
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
