import mongoose from "mongoose";

const { Schema } = mongoose;

const bikeSchema = new Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  imageSource: { type: String, required: true },
  imagePublicId: { type: String },
  name: { type: String },
  description: { type: String },
  type: { type: String },
  pricePerDay: { type: Number },
  isActive: { type: Boolean, default: true },
});

const Bike = mongoose.models.Bike || mongoose.model("Bike", bikeSchema);

export default Bike;
