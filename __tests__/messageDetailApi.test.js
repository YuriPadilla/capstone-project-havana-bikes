import mongoose from "mongoose";
import dbConnect from "../db/connect";
import Conversation from "../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";
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
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      _id: "conversation-id",
      status: "archived",
    });
  });

  test("adds an admin reply and changes status to replied", async () => {
    const conversation = {
      status: "read",
      messages: [],
      save: jest.fn().mockResolvedValue({
        _id: "conversation-id",
        status: "replied",
        messages: [
          {
            sender: "admin",
            message: "Yes, bikes are available.",
          },
        ],
      }),
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
      },
    ]);
    expect(conversation.status).toBe("replied");
    expect(conversation.save).toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(200);
  });
});
