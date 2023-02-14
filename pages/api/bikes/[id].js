import dbConnect from "../../../db/connect";
import Bike from "../../../db/models/Bike";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const bike = await Bike.findById(id);

    if (!bike) {
      return response.status(404).json({ status: "Not Found" });
    }

    return response.status(200).json(bike);
  } else {
    return response.status(405).json({ status: "Method Not Allowed" });
  }
}
