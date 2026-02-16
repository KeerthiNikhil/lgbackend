import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },

    name: String,
    description: String,
    specification: String,
    category: String,
    subCategory: String,
    price: Number,
    discountPrice: Number,
    discountPercent: Number,
    inStock: Boolean,
    sizes: [String],
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
