import mongoose from "mongoose";

const { Schema } = mongoose;

const bikeSchema = new Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  imageSource: { type: String, required: true },
});

const Bike = mongoose.models.Bike || mongoose.model("Bike", bikeSchema);

export default Bike;
