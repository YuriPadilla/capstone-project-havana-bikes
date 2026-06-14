import mongoose from "mongoose";
import dbConnect from "../db/connect";
import Conversation from "../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";
import { getAdminReplyEmail } from "@/utils/email/getAdminReplyEmail";
import { sendEmail } from "@/utils/email/sendEmail";
import handler from "@/pages/api/messages/[id]";

jest.mock("mongoose", () => ({
  Types: {
    ObjectId: {
      isValid: jest.fn(),
    },
  },
}));

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/Conversation", () => ({
  findById: jest.fn(),
}));

jest.mock("@/utils/auth", () => ({
  getAdminSession: jest.fn(),
}));

jest.mock("@/utils/email/getAdminReplyEmail", () => ({
  getAdminReplyEmail: jest.fn(),
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

function createRequest({
  method = "PATCH",
  id = "conversation-id",
  body = {},
} = {}) {
  return {
    method,
    query: { id },
    body,
  };
}

describe("PATCH /api/messages/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAdminSession.mockResolvedValue({
      session: { user: { role: "admin" } },
      status: 200,
    });
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    dbConnect.mockResolvedValue();
    getAdminReplyEmail.mockResolvedValue({
      subject: "Reply from Havana Bikes",
      text: "Reply email",
    });
    sendEmail.mockResolvedValue({
      success: true,
      messageId: "message-id",
    });
  });

  test("rejects invalid statuses with 400", async () => {
    const request = createRequest({ body: { status: "closed" } });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid conversation status",
    });
  });

  test("returns 404 when the conversation does not exist", async () => {
    Conversation.findById.mockResolvedValue(null);
    const request = createRequest({ body: { status: "archived" } });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: "Conversation not found",
    });
    expect(getAdminReplyEmail).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
  });

  test("updates the conversation status to archived", async () => {
    const conversation = {
      status: "read",
      save: jest.fn().mockResolvedValue({
        _id: "conversation-id",
        status: "archived",
      }),
    };
    Conversation.findById.mockResolvedValue(conversation);
    const request = createRequest({ body: { status: "archived" } });
    const response = createResponse();

    await handler(request, response);

    expect(conversation.status).toBe("archived");
    expect(conversation.save).toHaveBeenCalled();
    expect(getAdminReplyEmail).not.toHaveBeenCalled();
    expect(sendEmail).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      _id: "conversation-id",
      status: "archived",
    });
  });

  test("saves an admin reply before sending email and tracks a successful send", async () => {
    const conversation = {
      customerName: "Test User",
      customerEmail: "test@example.com",
      status: "read",
      messages: [],
      save: jest.fn().mockResolvedValue(),
    };
    Conversation.findById.mockResolvedValue(conversation);
    const request = createRequest({
      body: { message: " Yes, bikes are available. " },
    });
    const response = createResponse();

    await handler(request, response);

    expect(conversation.messages).toEqual([
      {
        sender: "admin",
        message: "Yes, bikes are available.",
        emailStatus: "sent",
        emailSentAt: expect.any(Date),
        emailError: undefined,
      },
    ]);
    expect(conversation.status).toBe("replied");
    expect(conversation.save).toHaveBeenCalledTimes(2);
    expect(conversation.save.mock.invocationCallOrder[0]).toBeLessThan(
      sendEmail.mock.invocationCallOrder[0]
    );
    expect(getAdminReplyEmail).toHaveBeenCalledWith({
      customerName: "Test User",
      message: "Yes, bikes are available.",
    });
    expect(sendEmail).toHaveBeenCalledWith({
      to: "test@example.com",
      subject: "Reply from Havana Bikes",
      text: "Reply email",
    });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(conversation);
  });

  test("keeps the saved reply and reports failed email delivery", async () => {
    sendEmail.mockResolvedValue({
      success: false,
      error: "Email could not be sent.",
    });
    const conversation = {
      customerName: "Test User",
      customerEmail: "test@example.com",
      status: "read",
      messages: [],
      save: jest.fn().mockResolvedValue(),
    };
    Conversation.findById.mockResolvedValue(conversation);
    const request = createRequest({
      body: { message: "Yes, bikes are available." },
    });
    const response = createResponse();

    await handler(request, response);

    expect(conversation.messages).toEqual([
      {
        sender: "admin",
        message: "Yes, bikes are available.",
        emailStatus: "failed",
        emailError: "Email could not be sent",
      },
    ]);
    expect(conversation.save).toHaveBeenCalledTimes(2);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(conversation);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: expect.arrayContaining([
          expect.objectContaining({
            sender: "admin",
            message: "Yes, bikes are available.",
            emailStatus: "failed",
            emailError: "Email could not be sent",
          }),
        ]),
      })
    );
  });

  test("updates only the newly added admin message when multiple replies exist", async () => {
    const existingAdminMessage = {
      sender: "admin",
      message: "Previous reply",
      emailStatus: "sent",
      emailSentAt: new Date("2026-06-13T10:00:00.000Z"),
    };
    const conversation = {
      customerName: "Test User",
      customerEmail: "test@example.com",
      status: "replied",
      messages: [
        {
          sender: "customer",
          message: "Original message",
          emailStatus: "not_sent",
        },
        existingAdminMessage,
      ],
      save: jest.fn().mockResolvedValue(),
    };
    Conversation.findById.mockResolvedValue(conversation);
    const request = createRequest({
      body: { message: "New reply" },
    });
    const response = createResponse();

    await handler(request, response);

    expect(conversation.messages[1]).toEqual(existingAdminMessage);
    expect(conversation.messages[2]).toEqual({
      sender: "admin",
      message: "New reply",
      emailStatus: "sent",
      emailSentAt: expect.any(Date),
      emailError: undefined,
    });
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
