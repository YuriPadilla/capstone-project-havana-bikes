import formidable from "formidable";
import dbConnect from "../db/connect";
import Bike from "../db/models/Bike";
import cloudinary from "@/utils/cloudinary";
import { getAdminSession } from "@/utils/auth";
import handler from "@/pages/api/admin/bikes";

jest.mock("formidable", () =>
  jest.fn(() => ({
    parse: jest.fn(),
  }))
);

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/Bike", () => ({
  find: jest.fn(),
  create: jest.fn(),
}));

jest.mock("@/utils/cloudinary", () => ({
  uploader: {
    upload: jest.fn(),
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

function createRequest({ method = "GET" } = {}) {
  return {
    method,
  };
}

function mockParsedForm({ fields = {}, files = {} } = {}) {
  formidable.mockImplementation(() => ({
    parse: jest.fn((request, callback) => callback(null, fields, files)),
  }));
}

function createValidBikeFields(overrides = {}) {
  return {
    name: "Classic Havana Bike",
    brand: "Trek",
    size: "M",
    type: "City bike",
    description: "Comfortable bike for riding through Havana.",
    pricePerDay: "12",
    isActive: "true",
    ...overrides,
  };
}

function createImageFile(overrides = {}) {
  return {
    filepath: "/tmp/bike-image.jpg",
    mimetype: "image/jpeg",
    ...overrides,
  };
}

describe("GET /api/admin/bikes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAdminSession.mockResolvedValue({
      session: { user: { role: "admin" } },
      status: 200,
    });
    dbConnect.mockResolvedValue();
  });

  test("rejects methods other than GET and POST with 405", async () => {
    const request = createRequest({ method: "PUT" });
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

  test("returns all bikes for admins without filtering by isActive", async () => {
    const bikes = [
      {
        _id: "active-bike-id",
        brand: "Trek",
        size: "M",
        isActive: true,
      },
      {
        _id: "inactive-bike-id",
        brand: "Specialized",
        size: "L",
        isActive: false,
      },
    ];
    Bike.find.mockResolvedValue(bikes);
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(dbConnect).toHaveBeenCalled();
    expect(Bike.find).toHaveBeenCalledWith();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(bikes);
  });

  test("returns 500 if bikes could not be loaded", async () => {
    Bike.find.mockRejectedValue(new Error("Database error"));
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: "Bikes could not be loaded",
    });
  });

  test("rejects guests on POST with 401", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 401 });
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: "Authentication required",
    });
  });

  test("rejects authenticated non-admin users on POST with 403", async () => {
    getAdminSession.mockResolvedValue({ session: null, status: 403 });
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      message: "Admin access required",
    });
  });

  test("returns 400 if required fields are missing on POST", async () => {
    mockParsedForm({
      fields: createValidBikeFields({ name: "" }),
      files: { image: createImageFile() },
    });
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(cloudinary.uploader.upload).not.toHaveBeenCalled();
    expect(Bike.create).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message:
        "Name, brand, size, type, description and price per day are required",
    });
  });

  test("returns 400 if image is missing on POST", async () => {
    mockParsedForm({
      fields: createValidBikeFields(),
      files: {},
    });
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(cloudinary.uploader.upload).not.toHaveBeenCalled();
    expect(Bike.create).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Bike image is required",
    });
  });

  test("returns 400 if pricePerDay is invalid on POST", async () => {
    mockParsedForm({
      fields: createValidBikeFields({ pricePerDay: "-1" }),
      files: { image: createImageFile() },
    });
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(cloudinary.uploader.upload).not.toHaveBeenCalled();
    expect(Bike.create).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: "Price per day must be a number greater than or equal to 0",
    });
  });

  test("creates a bike and returns 201 when admin sends valid POST data", async () => {
    const fields = createValidBikeFields({ isActive: "false" });
    const image = createImageFile();
    const createdBike = {
      _id: "new-bike-id",
      name: fields.name,
      brand: fields.brand,
      size: fields.size,
      type: fields.type,
      description: fields.description,
      pricePerDay: 12,
      isActive: false,
      imageSource: "https://res.cloudinary.com/demo/bike.jpg",
    };
    mockParsedForm({
      fields,
      files: { image },
    });
    cloudinary.uploader.upload.mockResolvedValue({
      secure_url: createdBike.imageSource,
    });
    Bike.create.mockResolvedValue(createdBike);
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(cloudinary.uploader.upload).toHaveBeenCalledWith(image.filepath, {
      folder: "havana-bikes/bikes",
    });
    expect(Bike.create).toHaveBeenCalledWith({
      name: fields.name,
      brand: fields.brand,
      size: fields.size,
      type: fields.type,
      description: fields.description,
      pricePerDay: 12,
      isActive: false,
      imageSource: createdBike.imageSource,
    });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(createdBike);
  });
});
