import mongoose from "mongoose";

const { Schema } = mongoose;

const siteSettingsSchema = new Schema({
  businessName: { type: String },
  currency: { type: String },
  hourlyPrice: { type: Number },
  firstDayPrice: { type: Number },
  additionalDayPrice: { type: Number },
  depositAmount: { type: Number },
  openingHours: { type: String },
  address: { type: String },
  phone: { type: String },
  whatsapp: { type: String },
  email: { type: String },
  pickupInfo: { type: String },
  depositInfo: { type: String },
});

const SiteSettings =
  mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
