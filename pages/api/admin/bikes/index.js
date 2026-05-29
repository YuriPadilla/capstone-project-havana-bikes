import dbConnect from "../../../../db/connect";
import Bike from "../../../../db/models/Bike";
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

  try {
    await dbConnect();

    const bikes = await Bike.find();

    return response.status(200).json(bikes);
  } catch (error) {
    return response.status(500).json({ message: "Bikes could not be loaded" });
  }
}
