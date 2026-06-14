import mongoose from "mongoose";
import dbConnect from "../../../db/connect";
import Conversation from "../../../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";
import { getAdminReplyEmail } from "@/utils/email/getAdminReplyEmail";
import { sendEmail } from "@/utils/email/sendEmail";

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
        emailStatus: "pending",
      });
      conversation.status = "replied";

      await conversation.save();

      const adminMessage =
        conversation.messages[conversation.messages.length - 1];
      let emailResult;

      try {
        const emailContent = await getAdminReplyEmail({
          customerName: conversation.customerName,
          message: cleanMessage,
        });

        emailResult = await sendEmail({
          to: conversation.customerEmail,
          subject: emailContent.subject,
          text: emailContent.text,
        });
      } catch (error) {
        emailResult = { success: false };
      }

      if (emailResult.success) {
        adminMessage.emailStatus = "sent";
        adminMessage.emailSentAt = new Date();
        adminMessage.emailError = undefined;
      } else {
        adminMessage.emailStatus = "failed";
        adminMessage.emailError = "Email could not be sent";
      }

      try {
        await conversation.save();
      } catch (error) {
        // The reply remains saved even if email tracking cannot update.
      }

      return response.status(200).json(conversation);
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
