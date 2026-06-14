import { getBusinessContactEmail } from "@/utils/email/getBusinessContactEmail";
import { sendEmail } from "@/utils/email/sendEmail";

export async function sendAdminMessageNotificationEmail({
  customerName,
  customerEmail,
  message,
  createdAt,
}) {
  const businessContactEmail = await getBusinessContactEmail();

  if (!businessContactEmail) {
    return {
      success: false,
      error: "Business contact email is not configured.",
    };
  }

  const creationDate = new Date(createdAt);
  const formattedCreationDate = Number.isNaN(creationDate.getTime())
    ? "Not available"
    : creationDate.toISOString();
  const text = [
    "A new customer message was received from the Havana Bikes website.",
    `Customer name: ${customerName}`,
    `Customer email: ${customerEmail}`,
    `Message: ${message}`,
    `Created at: ${formattedCreationDate}`,
    "Sign in to the admin area to manage this conversation.",
  ].join("\n\n");

  return sendEmail({
    to: businessContactEmail,
    subject: "New message from Havana Bikes website",
    text,
  });
}
