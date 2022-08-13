import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  productName: String,
  productId: Number,
});

export default mongoose.model("capstones", cardSchema);
