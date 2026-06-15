import dbConnect from "../../../db/connect";
import VisitStats from "../../../db/models/VisitStats";
import { getAdminSession } from "@/utils/auth";

export default async function handler(request, response) {
  if (request.method !== "POST") {
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

    const visitStats = await VisitStats.findOne();

    if (!visitStats) {
      return response.status(200).json({
        totalVisits: 0,
        updatedAt: null,
      });
    }

    visitStats.totalVisits = Math.max(0, visitStats.totalVisits - 1);
    await visitStats.save();

    return response.status(200).json(visitStats);
  } catch {
    return response
      .status(500)
      .json({ message: "Visit statistics could not be updated" });
  }
}
