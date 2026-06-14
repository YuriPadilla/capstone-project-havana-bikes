import nodemailer from "nodemailer";
import { sendEmail } from "@/utils/email/sendEmail";

jest.mock("nodemailer", () => ({
  __esModule: true,
  default: {
    createTransport: jest.fn(),
  },
}));

const originalEnv = process.env;
const emailEnvironmentVariables = [
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASSWORD",
  "EMAIL_FROM",
  "EMAIL_SECURE",
  "BUSINESS_CONTACT_EMAIL",
];

function setCompleteEmailConfiguration() {
  process.env.EMAIL_HOST = "smtp.example.test";
  process.env.EMAIL_PORT = "465";
  process.env.EMAIL_USER = "test-user";
  process.env.EMAIL_PASSWORD = "test-password";
  process.env.EMAIL_FROM = "Havana Bikes <sender@example.test>";
  process.env.EMAIL_SECURE = "true";
}

describe("sendEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };

    emailEnvironmentVariables.forEach((variable) => {
      delete process.env[variable];
    });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("returns a controlled error when email configuration is incomplete", async () => {
    const result = await sendEmail({
      to: "recipient@example.test",
      subject: "Test subject",
      text: "Test message",
      html: "<p>Test message</p>",
    });

    expect(result).toEqual({
      success: false,
      error: "Email configuration is incomplete.",
    });
    expect(nodemailer.createTransport).not.toHaveBeenCalled();
  });

  test("creates a transporter with the configured SMTP values", async () => {
    setCompleteEmailConfiguration();
    const sendMail = jest.fn().mockResolvedValue({ messageId: "message-id" });
    nodemailer.createTransport.mockReturnValue({ sendMail });

    await sendEmail({
      to: "recipient@example.test",
      subject: "Test subject",
      text: "Test message",
      html: "<p>Test message</p>",
    });

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "smtp.example.test",
      port: 465,
      secure: true,
      auth: {
        user: "test-user",
        pass: "test-password",
      },
    });
  });

  test("sends the expected email data", async () => {
    setCompleteEmailConfiguration();
    const sendMail = jest.fn().mockResolvedValue({ messageId: "message-id" });
    nodemailer.createTransport.mockReturnValue({ sendMail });

    const result = await sendEmail({
      to: "recipient@example.test",
      subject: "Test subject",
      text: "Test message",
      html: "<p>Test message</p>",
    });

    expect(sendMail).toHaveBeenCalledWith({
      from: "Havana Bikes <sender@example.test>",
      to: "recipient@example.test",
      subject: "Test subject",
      text: "Test message",
      html: "<p>Test message</p>",
    });
    expect(result).toEqual({
      success: true,
      messageId: "message-id",
    });
  });

  test("returns a controlled error when sending fails", async () => {
    setCompleteEmailConfiguration();
    const sendMail = jest.fn().mockRejectedValue(new Error("SMTP error"));
    nodemailer.createTransport.mockReturnValue({ sendMail });

    const result = await sendEmail({
      to: "recipient@example.test",
      subject: "Test subject",
      text: "Test message",
      html: "<p>Test message</p>",
    });

    expect(result).toEqual({
      success: false,
      error: "Email could not be sent.",
    });
  });
});
