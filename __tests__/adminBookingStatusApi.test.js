import mongoose from "mongoose";
import dbConnect from "../db/connect";
import Booking from "../db/models/Booking";
import { getAdminSession } from "@/utils/auth";
import handler from "@/pages/api/admin/bookings/[id]";

jest.mock("mongoose", () => ({
  Types: {
    ObjectId: {
      isValid: jest.fn(),
    },
  },
}));

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/Booking", () => ({
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

function createRequest({ method = "PATCH", id = "booking-id", status } = {}) {
  return {
    method,
    query: { id },
    body: { status },
  };
}

describe("PATCH /api/admin/bookings/[id]", () => {
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

  test("rejects requests without admin permissions with 401", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 401 });
    const request = createRequest({ status: "confirmed" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });
  });

  test("rejects authenticated non-admin requests with 403", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 403 });
    const request = createRequest({ status: "confirmed" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      message: "Admin access required",
    });
  });

  test("rejects invalid ids with 400", async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    const request = createRequest({ id: "invalid-id", status: "confirmed" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid booking id",
    });
  });

  test("rejects invalid statuses with 400", async () => {
    const request = createRequest({ status: "done" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid booking status",
    });
  });

  test("returns 404 if the booking does not exist", async () => {
    Booking.findByIdAndUpdate.mockResolvedValue(null);
    const request = createRequest({ status: "confirmed" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: "Booking not found",
    });
  });

  test("returns 200 and the updated booking when admin sends a valid status", async () => {
    const updatedBooking = {
      _id: "booking-id",
      status: "confirmed",
    };
    Booking.findByIdAndUpdate.mockResolvedValue(updatedBooking);
    const request = createRequest({ status: "confirmed" });
    const response = createResponse();

    await handler(request, response);

    expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(
      "booking-id",
      { status: "confirmed" },
      { new: true }
    );
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(updatedBooking);
  });
});
