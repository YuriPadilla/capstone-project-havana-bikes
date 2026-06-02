import dbConnect from "../db/connect";
import Conversation from "../db/models/Conversation";
import { getAdminSession } from "@/utils/auth";
import handler from "@/pages/api/messages";

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/Conversation", () => ({
  find: jest.fn(),
  create: jest.fn(),
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

function createRequest({ method = "GET", body = {} } = {}) {
  return {
    method,
    body,
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
        status: "open",
      },
    ];
    const sort = jest.fn().mockResolvedValue(conversations);
    Conversation.find.mockReturnValue({ sort });
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(dbConnect).toHaveBeenCalled();
    expect(Conversation.find).toHaveBeenCalledWith();
    expect(sort).toHaveBeenCalledWith({ updatedAt: -1, createdAt: -1 });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(conversations);
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
