import mongoose from "mongoose";
import dbConnect from "../../../../db/connect";
import Booking from "../../../../db/models/Booking";
import { getAdminSession } from "@/utils/auth";

const allowedStatuses = ["pending", "confirmed", "cancelled"];

export default async function handler(request, response) {
  if (request.method !== "PATCH") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  const { status: adminStatus } = await getAdminSession(request, response);

  if (adminStatus === 401) {
    return response.status(401).json({ message: "Authentication required" });
  }

  if (adminStatus === 403) {
    return response.status(403).json({ message: "Admin access required" });
  }

  const { id } = request.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid booking id" });
  }

  const { status } = request.body;

  if (!allowedStatuses.includes(status)) {
    return response.status(400).json({ message: "Invalid booking status" });
  }

  try {
    await dbConnect();

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return response.status(404).json({ message: "Booking not found" });
    }

    return response.status(200).json(updatedBooking);
  } catch (error) {
    return response.status(500).json({
      message: "Booking status could not be updated",
    });
  }
}
