import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  specification: string;
  category: string;
  subCategory: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  inStock: boolean;
  sizes: string[];
  images: string[];
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
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

export default mongoose.model<IProduct>("Product", productSchema);
