import mongoose from "mongoose";
import dbConnect from "../db/connect";
import Bike from "../db/models/Bike";
import { getAdminSession } from "@/utils/auth";
import handler from "@/pages/api/admin/bikes/[id]";

jest.mock("mongoose", () => ({
  Types: {
    ObjectId: {
      isValid: jest.fn(),
    },
  },
}));

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/Bike", () => ({
  findByIdAndUpdate: jest.fn(),
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
  id = "bike-id",
  isActive,
} = {}) {
  return {
    method,
    query: { id },
    body: { isActive },
  };
}

describe("PATCH /api/admin/bikes/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAdminSession.mockResolvedValue({
      session: { user: { role: "admin" } },
      status: 200,
    });
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    dbConnect.mockResolvedValue();
  });

  test("rejects methods other than PATCH with 405", async () => {
    const request = createRequest({ method: "GET" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(405);
    expect(response.json).toHaveBeenCalledWith({
      status: "Method Not Allowed",
    });
  });

  test("rejects guests with 401", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 401 });
    const request = createRequest({ isActive: false });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });
  });

  test("rejects authenticated non-admin users with 403", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 403 });
    const request = createRequest({ isActive: false });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      message: "Admin access required",
    });
  });

  test("rejects invalid ids with 400", async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    const request = createRequest({ id: "invalid-id", isActive: false });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid bike id",
    });
  });

  test("rejects non-boolean isActive values with 400", async () => {
    const request = createRequest({ isActive: "false" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid bike status",
    });
  });

  test("returns 404 if the bike does not exist", async () => {
    Bike.findByIdAndUpdate.mockResolvedValue(null);
    const request = createRequest({ isActive: false });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: "Bike not found",
    });
  });

  test("returns 200 and the updated bike when admin sends a valid boolean status", async () => {
    const updatedBike = {
      _id: "bike-id",
      isActive: false,
    };
    Bike.findByIdAndUpdate.mockResolvedValue(updatedBike);
    const request = createRequest({ isActive: false });
    const response = createResponse();

    await handler(request, response);

    expect(Bike.findByIdAndUpdate).toHaveBeenCalledWith(
      "bike-id",
      { isActive: false },
      { new: true }
    );
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(updatedBike);
  });
});
