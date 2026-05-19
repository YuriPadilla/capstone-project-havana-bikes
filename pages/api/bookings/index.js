import dbConnect from "../../../db/connect";
import Booking from "../../../db/models/Booking";

export default async function handler(request, response) {
  if (request.method === "POST") {
    const bookingData = request.body;
    const {
      customerName,
      customerEmail,
      selectedBikes,
      fromDate,
      untilDate,
      totalPrice,
    } = bookingData;

    if (
      !customerName ||
      !customerEmail ||
      !Array.isArray(selectedBikes) ||
      selectedBikes.length === 0 ||
      !fromDate ||
      !untilDate ||
      totalPrice === undefined
    ) {
      return response.status(400).json({
        status: "Bad Request",
        message: "Missing required booking fields",
      });
    }

    try {
      await dbConnect();

      const booking = new Booking(bookingData);
      const savedBooking = await booking.save();

      return response.status(201).json(savedBooking);
    } catch (error) {
      return response.status(500).json({
        status: "Internal Server Error",
        message: "Booking could not be created",
      });
    }
  } else {
    return response.status(405).json({ status: "Method Not Allowed" });
  }
}
