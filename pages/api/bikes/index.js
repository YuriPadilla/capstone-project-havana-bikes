import dbConnect from "../../../db/connect";
import Bike from "../../../db/models/Bike";

const MOCK_BIKES = [
  {
    _id: "mock-1",
    brand: "Havana Cruiser",
    size: "M",
    imageSource:
      "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&q=80&auto=format&fit=crop",
  },
  {
    _id: "mock-2",
    brand: "Malecon Rider",
    size: "L",
    imageSource:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=800&q=80&auto=format&fit=crop",
  },
  {
    _id: "mock-3",
    brand: "Old Havana",
    size: "S",
    imageSource:
      "https://images.unsplash.com/photo-1500304587225-4c2f0b2d9f8f?w=800&q=80&auto=format&fit=crop",
  },
];

export default async function handler(request, response) {
  if (request.method !== "GET") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  try {
    await dbConnect();
    const bikes = await Bike.find();
    return response.status(200).json(bikes);
  } catch (error) {
    console.error("DB error:", error.message || error);
    if (process.env.USE_MOCKS === "true") {
      return response.status(200).json(MOCK_BIKES);
    }
    return response.status(500).json({ status: "DB Connection Error" });
  }
}
