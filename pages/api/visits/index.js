import dbConnect from "../../../db/connect";
import VisitStats from "../../../db/models/VisitStats";

export default async function handler(request, response) {
  if (!["GET", "POST"].includes(request.method)) {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  try {
    await dbConnect();

    if (request.method === "GET") {
      const visitStats = await VisitStats.findOne();

      return response.status(200).json(
        visitStats || {
          totalVisits: 0,
          updatedAt: null,
        }
      );
    }

    const updatedVisitStats = await VisitStats.findOneAndUpdate(
      {},
      { $inc: { totalVisits: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return response.status(200).json(updatedVisitStats);
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Visit statistics could not be updated" });
  }
}
