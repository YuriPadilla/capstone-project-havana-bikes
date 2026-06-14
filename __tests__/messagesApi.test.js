import dbConnect from "../db/connect";
import Conversation from "../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";
import { getContactConfirmationEmail } from "@/utils/email/getContactConfirmationEmail";
import { sendAdminMessageNotificationEmail } from "@/utils/email/sendAdminMessageNotificationEmail";
import { sendEmail } from "@/utils/email/sendEmail";
import handler from "@/pages/api/messages";

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/Conversation", () => ({
  find: jest.fn(),
  create: jest.fn(),
}));

jest.mock("@/utils/auth", () => ({
  getAdminSession: jest.fn(),
}));

jest.mock("@/utils/email/getContactConfirmationEmail", () => ({
  getContactConfirmationEmail: jest.fn(),
}));

jest.mock("@/utils/email/sendAdminMessageNotificationEmail", () => ({
  sendAdminMessageNotificationEmail: jest.fn(),
}));

jest.mock("@/utils/email/sendEmail", () => ({
  sendEmail: jest.fn(),
}));

function createResponse() {
  return {
    status: jest.fn(function status() {
      return this;
    }),
    json: jest.fn(function json() {
      return this;
    }),
  };
}

function createRequest({ method = "GET", body = {}, query = {} } = {}) {
  return {
    method,
    body,
    query,
  };
}

describe("GET /api/messages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dbConnect.mockResolvedValue();
    getAdminSession.mockResolvedValue({
      session: { user: { role: "admin" } },
      status: 200,
    });
  });

  test("rejects guests with 401", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 401 });
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });
  });

  test("rejects authenticated non-admin users with 403", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 403 });
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      message: "Admin access required",
    });
  });

  test("returns conversations for admins sorted newest first", async () => {
    const conversations = [
      {
        _id: "conversation-id",
        customerName: "Test User",
        customerEmail: "test@example.com",
        status: "new",
      },
    ];
    const sort = jest.fn().mockResolvedValue(conversations);
    Conversation.find.mockReturnValue({ sort });
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(dbConnect).toHaveBeenCalled();
    expect(Conversation.find).toHaveBeenCalledWith({
      status: { $in: ["new", "read", "replied"] },
    });
    expect(sort).toHaveBeenCalledWith({ updatedAt: -1, createdAt: -1 });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(conversations);
  });

  test("returns archived conversations for archived view", async () => {
    const conversations = [
      {
        _id: "conversation-id",
        customerName: "Test User",
        customerEmail: "test@example.com",
        status: "archived",
      },
    ];
    const sort = jest.fn().mockResolvedValue(conversations);
    Conversation.find.mockReturnValue({ sort });
    const request = createRequest({ query: { view: "archived" } });
    const response = createResponse();

    await handler(request, response);

    expect(Conversation.find).toHaveBeenCalledWith({ status: "archived" });
    expect(sort).toHaveBeenCalledWith({ updatedAt: -1, createdAt: -1 });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(conversations);
  });

  test("rejects unsupported views with 400", async () => {
    const request = createRequest({ query: { view: "closed" } });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Unsupported messages view",
    });
  });

  test("returns 500 if conversations could not be loaded", async () => {
    const sort = jest.fn().mockRejectedValue(new Error("Database error"));
    Conversation.find.mockReturnValue({ sort });
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "Messages could not be loaded",
    });
  });

  test("rejects unsupported methods with 405", async () => {
    const request = createRequest({ method: "PUT" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(405);
    expect(response.json).toHaveBeenCalledWith({
      status: "Method Not Allowed",
    });
  });
});

describe("POST /api/messages", () => {
  let conversation;

  beforeEach(() => {
    jest.clearAllMocks();
    dbConnect.mockResolvedValue();
    conversation = {
      createdAt: new Date("2026-06-14T10:30:00.000Z"),
      confirmationEmail: {
        status: "not_sent",
      },
      adminNotificationEmail: {
        status: "not_sent",
      },
      save: jest.fn().mockResolvedValue(),
    };
    Conversation.create.mockResolvedValue(conversation);
    getContactConfirmationEmail.mockResolvedValue({
      subject: "We received your message — Havana Bikes",
      text: "Confirmation email",
    });
    sendEmail.mockResolvedValue({
      success: true,
      messageId: "message-id",
    });
    sendAdminMessageNotificationEmail.mockResolvedValue({
      success: true,
      messageId: "admin-message-id",
    });
  });

  test("saves the conversation before attempting either email", async () => {
    const request = createRequest({
      method: "POST",
      body: {
        customerName: "Test User",
        customerEmail: "test@example.com",
        message: "Hello Havana Bikes",
      },
    });
    const response = createResponse();

    await handler(request, response);

    expect(Conversation.create.mock.invocationCallOrder[0]).toBeLessThan(
      getContactConfirmationEmail.mock.invocationCallOrder[0]
    );
    expect(Conversation.create.mock.invocationCallOrder[0]).toBeLessThan(
      sendAdminMessageNotificationEmail.mock.invocationCallOrder[0]
    );
    expect(sendEmail.mock.invocationCallOrder[0]).toBeLessThan(
      sendAdminMessageNotificationEmail.mock.invocationCallOrder[0]
    );
  });

  test("tracks successful customer confirmation and admin notification emails", async () => {
    const request = createRequest({
      method: "POST",
      body: {
        customerName: "Test User",
        customerEmail: "test@example.com",
        message: "Hello Havana Bikes",
      },
    });
    const response = createResponse();

    await handler(request, response);

    expect(Conversation.create).toHaveBeenCalledWith({
      customerName: "Test User",
      customerEmail: "test@example.com",
      status: "new",
      messages: [
        {
          sender: "customer",
          message: "Hello Havana Bikes",
        },
      ],
    });
    expect(getContactConfirmationEmail).toHaveBeenCalledWith({
      customerName: "Test User",
      message: "Hello Havana Bikes",
    });
    expect(sendEmail).toHaveBeenCalledWith({
      to: "test@example.com",
      subject: "We received your message — Havana Bikes",
      text: "Confirmation email",
    });
    expect(conversation.confirmationEmail).toEqual({
      status: "sent",
      sentAt: expect.any(Date),
    });
    expect(sendAdminMessageNotificationEmail).toHaveBeenCalledWith({
      customerName: "Test User",
      customerEmail: "test@example.com",
      message: "Hello Havana Bikes",
      createdAt: new Date("2026-06-14T10:30:00.000Z"),
    });
    expect(conversation.adminNotificationEmail).toEqual({
      status: "sent",
      sentAt: expect.any(Date),
    });
    expect(conversation.save).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      message: "Message saved successfully",
    });
  });

  test("keeps the saved conversation and tracks a failed confirmation email", async () => {
    sendEmail.mockResolvedValue({
      success: false,
      error: "Technical SMTP error",
    });
    const request = createRequest({
      method: "POST",
      body: {
        customerName: "Test User",
        customerEmail: "test@example.com",
        message: "Hello Havana Bikes",
      },
    });
    const response = createResponse();

    await handler(request, response);

    expect(conversation.confirmationEmail).toEqual({
      status: "failed",
      failedAt: expect.any(Date),
    });
    expect(sendAdminMessageNotificationEmail).toHaveBeenCalled();
    expect(conversation.adminNotificationEmail).toEqual({
      status: "sent",
      sentAt: expect.any(Date),
    });
    expect(conversation.save).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      message: "Message saved successfully",
    });
    expect(response.json).not.toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Technical SMTP error",
      })
    );
  });

  test("returns 201 and tracks a failed admin notification", async () => {
    sendAdminMessageNotificationEmail.mockResolvedValue({
      success: false,
      error: "Business contact email is not configured.",
    });
    const request = createRequest({
      method: "POST",
      body: {
        customerName: "Test User",
        customerEmail: "test@example.com",
        message: "Hello Havana Bikes",
      },
    });
    const response = createResponse();

    await handler(request, response);

    expect(conversation.confirmationEmail).toEqual({
      status: "sent",
      sentAt: expect.any(Date),
    });
    expect(conversation.adminNotificationEmail).toEqual({
      status: "failed",
      failedAt: expect.any(Date),
      error: "Admin notification email could not be sent.",
    });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      status: "success",
      message: "Message saved successfully",
    });
  });

  test("returns 201 when both emails fail", async () => {
    sendEmail.mockResolvedValue({
      success: false,
      error: "Email could not be sent.",
    });
    sendAdminMessageNotificationEmail.mockRejectedValue(
      new Error("Unexpected notification error")
    );
    const request = createRequest({
      method: "POST",
      body: {
        customerName: "Test User",
        customerEmail: "test@example.com",
        message: "Hello Havana Bikes",
      },
    });
    const response = createResponse();

    await handler(request, response);

    expect(conversation.confirmationEmail.status).toBe("failed");
    expect(conversation.adminNotificationEmail.status).toBe("failed");
    expect(conversation.save).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(201);
  });
});
