import dbConnect from "../../../../db/connect";
import Booking from "../../../../db/models/Booking";
import { getAdminSession } from "@/utils/auth";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  const { status } = await getAdminSession(request, response);

  if (status === 401) {
    return response.status(401).json({ message: "Authentication required" });
  }

  if (status === 403) {
    return response.status(403).json({ message: "Admin access required" });
  }

  await dbConnect();

  const bookings = await Booking.find()
    .populate("selectedBikes", "brand size name type pricePerDay")
    .sort({ createdAt: -1 });

  return response.status(200).json(bookings);
}
