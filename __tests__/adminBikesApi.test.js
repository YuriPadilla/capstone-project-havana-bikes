import dbConnect from "../db/connect";
import Bike from "../db/models/Bike";
import { getAdminSession } from "@/utils/auth";
import handler from "@/pages/api/admin/bikes";

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/Bike", () => ({
  find: jest.fn(),
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

describe("GET /api/admin/bikes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAdminSession.mockResolvedValue({
      session: { user: { role: "admin" } },
      status: 200,
    });
    dbConnect.mockResolvedValue();
  });

  test("rejects methods other than GET with 405", async () => {
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
});
