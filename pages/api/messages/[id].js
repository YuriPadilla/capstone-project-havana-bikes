import mongoose from "mongoose";
import dbConnect from "../../../db/connect";
import Conversation from "../../../db/models/Conversation";
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

  const { id } = request.query;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "Invalid conversation id" });
  }

  try {
    await dbConnect();

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return response.status(404).json({ message: "Conversation not found" });
    }

    return response.status(200).json(conversation);
  } catch (error) {
    return response.status(500).json({
      message: "Conversation could not be loaded",
    });
  }
}
