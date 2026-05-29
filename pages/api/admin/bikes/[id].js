import mongoose from "mongoose";
import dbConnect from "../../../../db/connect";
import Bike from "../../../../db/models/Bike";
import { getAdminSession } from "@/utils/auth";

export default async function handler(request, response) {
  if (request.method !== "PATCH") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  const { status } = await getAdminSession(request, response);

  if (status === 401) {
    return response.status(401).json({ message: "Authentication required" });
  }

  if (status === 403) {
    return response.status(403).json({ message: "Admin access required" });
  }

  const { id } = request.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid bike id" });
  }

  const { isActive } = request.body;

  if (typeof isActive !== "boolean") {
    return response.status(400).json({ message: "Invalid bike status" });
  }

  try {
    await dbConnect();

    const updatedBike = await Bike.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!updatedBike) {
      return response.status(404).json({ message: "Bike not found" });
    }

    return response.status(200).json(updatedBike);
  } catch (error) {
    return response.status(500).json({
      message: "Bike status could not be updated",
    });
  }
}
