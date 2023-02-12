import dbConnect from "../../../db/connect";
import Bike from "../../../db/models/Bike";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const bikes = await Bike.find();
    return response.status(200).json(bikes);
  }
}
