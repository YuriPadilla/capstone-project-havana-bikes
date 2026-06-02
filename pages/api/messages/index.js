import dbConnect from "../../../db/connect";
import Conversation from "../../../db/models/Conversation";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(request, response) {
  await dbConnect();

  if (request.method !== "POST") {
    return response.status(405).json({ status: "Method Not Allowed" });
  }

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
