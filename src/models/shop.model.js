import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  shopName: String,
  shopType: String,
  shopImage: String,
  location: String,
});

export default mongoose.model("Shop", shopSchema);
