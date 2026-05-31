import mongoose from "mongoose";
import dbConnect from "../db/connect";
import Booking from "../db/models/Booking";
import Bike from "../db/models/Bike";
import cloudinary from "@/utils/cloudinary";
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
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock("../db/models/Booking", () => ({
  findOne: jest.fn(),
}));

jest.mock("@/utils/cloudinary", () => ({
  uploader: {
    destroy: jest.fn(),
  },
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

function createRequest({ method = "DELETE", id = "bike-id" } = {}) {
  return {
    method,
    query: { id },
  };
}

describe("DELETE /api/admin/bikes/[id]", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAdminSession.mockResolvedValue({
      session: { user: { role: "admin" } },
      status: 200,
    });
    mongoose.Types.ObjectId.isValid.mockReturnValue(true);
    dbConnect.mockResolvedValue();
    Booking.findOne.mockResolvedValue(null);
    cloudinary.uploader.destroy.mockResolvedValue({ result: "ok" });
  });

  test("rejects methods other than GET, PATCH and DELETE with 405", async () => {
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(405);
    expect(response.json).toHaveBeenCalledWith({
      status: "Method Not Allowed",
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

  test("rejects invalid ids with 400", async () => {
    mongoose.Types.ObjectId.isValid.mockReturnValue(false);
    const request = createRequest({ id: "invalid-id" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Invalid bike id",
    });
  });

  test("returns 404 if the bike does not exist", async () => {
    Bike.findById.mockResolvedValue(null);
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({
      message: "Bike not found",
    });
  });

  test("returns 409 if the bike is used in existing bookings", async () => {
    Bike.findById.mockResolvedValue({
      _id: "bike-id",
      isActive: false,
      imagePublicId: "havana-bikes/bikes/bike-id",
    });
    Booking.findOne.mockResolvedValue({ _id: "booking-id" });
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(Booking.findOne).toHaveBeenCalledWith({ selectedBikes: "bike-id" });
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
    expect(Bike.findByIdAndDelete).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message:
        "This bike is used in existing bookings and cannot be permanently deleted. Deactivate it instead.",
    });
  });

  test("returns 409 if the bike is active", async () => {
    Bike.findById.mockResolvedValue({
      _id: "bike-id",
      isActive: true,
      imagePublicId: "havana-bikes/bikes/bike-id",
    });
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(Booking.findOne).not.toHaveBeenCalled();
    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
    expect(Bike.findByIdAndDelete).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(409);
    expect(response.json).toHaveBeenCalledWith({
      message:
        "This bike is active and cannot be permanently deleted. Deactivate it first.",
    });
  });

  test("deletes Cloudinary image and bike if imagePublicId exists", async () => {
    const bike = {
      _id: "bike-id",
      isActive: false,
      imagePublicId: "havana-bikes/bikes/bike-id",
    };
    Bike.findById.mockResolvedValue(bike);
    Bike.findByIdAndDelete.mockResolvedValue(bike);
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith(
      bike.imagePublicId
    );
    expect(Bike.findByIdAndDelete).toHaveBeenCalledWith("bike-id");
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: "Bike deleted successfully",
    });
  });

  test("does not call Cloudinary if imagePublicId is missing", async () => {
    const bike = {
      _id: "bike-id",
      isActive: false,
    };
    Bike.findById.mockResolvedValue(bike);
    Bike.findByIdAndDelete.mockResolvedValue(bike);
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(cloudinary.uploader.destroy).not.toHaveBeenCalled();
    expect(Bike.findByIdAndDelete).toHaveBeenCalledWith("bike-id");
    expect(response.status).toHaveBeenCalledWith(200);
  });

  test("returns 502 if Cloudinary deletion fails", async () => {
    const bike = {
      _id: "bike-id",
      isActive: false,
      imagePublicId: "havana-bikes/bikes/bike-id",
    };
    Bike.findById.mockResolvedValue(bike);
    cloudinary.uploader.destroy.mockRejectedValue(new Error("Cloudinary error"));
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(Bike.findByIdAndDelete).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(502);
    expect(response.json).toHaveBeenCalledWith({
      message: "Image could not be deleted. Please try again.",
    });
  });

  test("returns 500 if MongoDB deletion fails", async () => {
    const bike = {
      _id: "bike-id",
      isActive: false,
    };
    Bike.findById.mockResolvedValue(bike);
    Bike.findByIdAndDelete.mockRejectedValue(new Error("Database error"));
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "Bike could not be deleted. Please try again.",
    });
  });
});
