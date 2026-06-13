import mongoose from "mongoose";
import dbConnect from "../../../db/connect";
import Conversation from "../../../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";

const allowedStatuses = ["new", "read", "replied", "archived"];

export default async function handler(request, response) {
  if (!["GET", "PATCH"].includes(request.method)) {
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

  if (request.method === "PATCH") {
    const requestedStatus = request.body?.status;
    const cleanMessage =
      typeof request.body?.message === "string"
        ? request.body.message.trim()
        : "";

    if (
      requestedStatus !== undefined &&
      !allowedStatuses.includes(requestedStatus)
    ) {
      return response.status(400).json({
        message: "Invalid conversation status",
      });
    }

    if (requestedStatus === undefined && !cleanMessage) {
      return response.status(400).json({
        message: "Message is required",
      });
    }

    try {
      await dbConnect();

      const conversation = await Conversation.findById(id);

      if (!conversation) {
        return response.status(404).json({ message: "Conversation not found" });
      }

      if (requestedStatus !== undefined) {
        conversation.status = requestedStatus;

        const updatedConversation = await conversation.save();

        return response.status(200).json(updatedConversation);
      }

      conversation.messages.push({
        sender: "admin",
        message: cleanMessage,
      });
      conversation.status = "replied";

      const updatedConversation = await conversation.save();

      return response.status(200).json(updatedConversation);
    } catch (error) {
      return response.status(500).json({
        message: "Conversation could not be updated",
      });
    }
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
