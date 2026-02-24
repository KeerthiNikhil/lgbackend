import mongoose, { Schema, Document } from "mongoose";

export interface IShop extends Document {
  shopName: string;
  shopType: string;
  shopImage: string;
  location: string;
  description?: string;
  vendorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const shopSchema: Schema<IShop> = new Schema(
  {
    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    shopType: {
      type: String,
      required: true,
    },

    shopImage: {
      type: String, // store image URL
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const Shop = mongoose.model<IShop>("Shop", shopSchema);

export default Shop;
