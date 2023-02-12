import dbConnect from "../../../db/connect";
import Bike from "../../../db/models/Bike";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  const bike = await Bike.findById(id);

  if (!bike) {
    return response.status(404).json({ status: "Not Found" });
  }

  return response.status(200).json(bike);
}
