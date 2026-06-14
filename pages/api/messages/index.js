import dbConnect from "../../../db/connect";
import Conversation from "../../../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";
import { getContactConfirmationEmail } from "@/utils/email/getContactConfirmationEmail";
import { sendEmail } from "@/utils/email/sendEmail";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(request, response) {
  if (request.method === "GET") {
    const { status } = await getAdminSession(request, response);
    const { view = "inbox" } = request.query || {};

    if (status === 401) {
      return response.status(401).json({ message: "Authentication required" });
    }

    if (status === 403) {
      return response.status(403).json({ message: "Admin access required" });
    }

    if (!["inbox", "archived"].includes(view)) {
      return response.status(400).json({
        message: "Unsupported messages view",
      });
    }

    try {
      await dbConnect();

      const filter =
        view === "archived"
          ? { status: "archived" }
          : { status: { $in: ["new", "read", "replied"] } };

      const conversations = await Conversation.find(filter).sort({
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
    const conversation = await Conversation.create({
      customerName: cleanCustomerName,
      customerEmail: cleanCustomerEmail,
      status: "new",
      messages: [
        {
          sender: "customer",
          message: cleanMessage,
        },
      ],
    });

    let emailResult;

    try {
      const emailContent = await getContactConfirmationEmail({
        customerName: cleanCustomerName,
        message: cleanMessage,
      });

      emailResult = await sendEmail({
        to: cleanCustomerEmail,
        subject: emailContent.subject,
        text: emailContent.text,
      });
    } catch (error) {
      emailResult = { success: false };
    }

    const emailTimestamp = new Date();

    conversation.confirmationEmail = emailResult.success
      ? {
          status: "sent",
          sentAt: emailTimestamp,
        }
      : {
          status: "failed",
          failedAt: emailTimestamp,
        };

    try {
      await conversation.save();
    } catch (error) {
      // The contact message remains saved even if email tracking cannot update.
    }

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
