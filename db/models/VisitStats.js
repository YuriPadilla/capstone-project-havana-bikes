import mongoose from "mongoose";

const { Schema } = mongoose;

const visitStatsSchema = new Schema(
  {
    totalVisits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const VisitStats =
  mongoose.models.VisitStats ||
  mongoose.model("VisitStats", visitStatsSchema);

export default VisitStats;
