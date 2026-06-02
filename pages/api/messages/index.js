import dbConnect from "../../../db/connect";
import Conversation from "../../../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(request, response) {
  if (request.method === "GET") {
    const { status } = await getAdminSession(request, response);

    if (status === 401) {
      return response.status(401).json({ message: "Authentication required" });
    }

    if (status === 403) {
      return response.status(403).json({ message: "Admin access required" });
    }

    try {
      await dbConnect();

      const conversations = await Conversation.find().sort({
        updatedAt: -1,
        createdAt: -1,
      });

      return response.status(200).json(conversations);
    } catch (error) {
      return response.status(500).json({
        message: "Messages could not be loaded",
      });
    }
  }

  if (request.method !== "POST") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

  await dbConnect();

  const { customerName, customerEmail, message } = request.body || {};
  const cleanCustomerName =
    typeof customerName === "string" ? customerName.trim() : "";
  const cleanCustomerEmail =
    typeof customerEmail === "string" ? customerEmail.trim().toLowerCase() : "";
  const cleanMessage = typeof message === "string" ? message.trim() : "";

  if (!cleanCustomerName || !cleanCustomerEmail || !cleanMessage) {
    return response.status(400).json({
      status: "Bad Request",
      message: "Name, email and message are required.",
    });
  }

  if (!isValidEmail(cleanCustomerEmail)) {
    return response.status(400).json({
      status: "Bad Request",
      message: "Please enter a valid email address.",
    });
  }

  try {
    await Conversation.create({
      customerName: cleanCustomerName,
      customerEmail: cleanCustomerEmail,
      status: "open",
      messages: [
        {
          sender: "customer",
          message: cleanMessage,
        },
      ],
    });

    return response.status(201).json({
      status: "success",
      message: "Message saved successfully",
    });
  } catch (error) {
    return response.status(500).json({
      status: "Internal Server Error",
      message: "Message could not be saved.",
    });
  }
}
