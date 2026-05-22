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

    const requestedFromDate = new Date(fromDate);
    const requestedUntilDate = new Date(untilDate);

    if (
      Number.isNaN(requestedFromDate.getTime()) ||
      Number.isNaN(requestedUntilDate.getTime()) ||
      requestedUntilDate < requestedFromDate
    ) {
      return response.status(400).json({
        error: "Invalid rental dates.",
      });
    }

    try {
      await dbConnect();

      const selectedBikeIds = selectedBikes.map((bikeId) => bikeId.toString());
      const overlappingBookings = await Booking.find({
        selectedBikes: { $in: selectedBikes },
        status: { $ne: "cancelled" },
        fromDate: { $lte: requestedUntilDate },
        untilDate: { $gte: requestedFromDate },
      }).select("selectedBikes");

      if (overlappingBookings.length > 0) {
        const unavailableBikeIds = [
          ...new Set(
            overlappingBookings.flatMap((booking) => {
              return booking.selectedBikes
                .filter((bikeId) => selectedBikeIds.includes(bikeId.toString()))
                .map((bikeId) => bikeId.toString());
            })
          ),
        ];

        return response.status(409).json({
          error:
            "One or more selected bikes are not available for the selected dates.",
          unavailableBikeIds,
        });
      }

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
