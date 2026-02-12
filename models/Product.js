import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
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

    date: Date,

    images: [String], // image URLs / filenames
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
