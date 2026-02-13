import mongoose, { Document, Schema } from "mongoose";

export interface IShop extends Document {
  name: string;
  description?: string;
  owner: mongoose.Types.ObjectId;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  isApproved: boolean;
  isActive: boolean;
}

const shopSchema = new Schema<IShop>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// 🔥 VERY IMPORTANT — Geo Index
shopSchema.index({ location: "2dsphere" });

export default mongoose.model<IShop>("Shop", shopSchema);
