import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, text, html }) {
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASSWORD,
    EMAIL_FROM,
    EMAIL_SECURE,
    BUSINESS_CONTACT_EMAIL,
  } = process.env;
  const port = Number(EMAIL_PORT);
  const from =
    EMAIL_FROM ||
    (BUSINESS_CONTACT_EMAIL
      ? `Havana Bikes <${BUSINESS_CONTACT_EMAIL}>`
      : "");

  if (
    !EMAIL_HOST ||
    !EMAIL_PORT ||
    !Number.isFinite(port) ||
    !EMAIL_USER ||
    !EMAIL_PASSWORD ||
    !from
  ) {
    return {
      success: false,
      error: "Email configuration is incomplete.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port,
      secure: EMAIL_SECURE === "true",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    return {
      success: false,
      error: "Email could not be sent.",
    };
  }
}
