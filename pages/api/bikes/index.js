import dbConnect from "../../../db/connect";
import Bike from "../../../db/models/Bike";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const bikes = await Bike.find({
      $or: [{ isActive: true }, { isActive: { $exists: false } }],
    });
    return response.status(200).json(bikes);
  } else {
    return response.status(405).json({ status: "Method Not Allowed" });
  }
}
