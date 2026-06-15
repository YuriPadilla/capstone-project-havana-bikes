import dbConnect from "../db/connect";
import VisitStats from "../db/models/VisitStats";
import handler from "@/pages/api/visits";

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/VisitStats", () => ({
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
}));

function createRequest({ method = "GET" } = {}) {
  return { method };
}

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

describe("/api/visits", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    dbConnect.mockResolvedValue();
  });

  test("GET returns the current visit statistics", async () => {
    VisitStats.findOne.mockResolvedValue(null);
    const request = createRequest();
    const response = createResponse();

    await handler(request, response);

    expect(dbConnect).toHaveBeenCalled();
    expect(VisitStats.findOne).toHaveBeenCalledWith();
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({ totalVisits: 0 })
    );
  });

  test("POST increments totalVisits and returns the updated statistics", async () => {
    const updatedVisitStats = {
      totalVisits: 4,
      updatedAt: new Date("2026-06-15T10:00:00.000Z"),
    };
    VisitStats.findOneAndUpdate.mockResolvedValue(updatedVisitStats);
    const request = createRequest({ method: "POST" });
    const response = createResponse();

    await handler(request, response);

    expect(dbConnect).toHaveBeenCalled();
    expect(VisitStats.findOneAndUpdate).toHaveBeenCalledWith(
      {},
      { $inc: { totalVisits: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(updatedVisitStats);
  });

  test("rejects unsupported methods with 405", async () => {
    const request = createRequest({ method: "PUT" });
    const response = createResponse();

    await handler(request, response);

    expect(dbConnect).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(405);
    expect(response.json).toHaveBeenCalledWith({
      status: "Method Not Allowed",
    });
  });
});
