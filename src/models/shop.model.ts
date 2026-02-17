import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

shopSchema.index({ coordinates: "2dsphere" });

export default mongoose.model("Shop", shopSchema);
