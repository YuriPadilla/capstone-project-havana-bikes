import { getServerSession } from "next-auth/next";
import { getAdminSession } from "./auth";

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("@/pages/api/auth/[...nextauth]", () => ({
  authOptions: {},
}));

describe("getAdminSession", () => {
  const request = {};
  const response = {};

  beforeEach(() => {
    getServerSession.mockReset();
  });

  test("returns status 401 when there is no session", async () => {
    getServerSession.mockResolvedValue(null);

    const result = await getAdminSession(request, response);

    expect(result).toEqual({ session: null, status: 401 });
  });

  test("returns status 403 when the session user is not an admin", async () => {
    getServerSession.mockResolvedValue({
      user: { role: "user" },
    });

    const result = await getAdminSession(request, response);

    expect(result).toEqual({ session: null, status: 403 });
  });

  test("returns status 200 and the session when the session user is an admin", async () => {
    const session = {
      user: {
        email: "admin@example.com",
        role: "admin",
      },
    };

    getServerSession.mockResolvedValue(session);

    const result = await getAdminSession(request, response);

    expect(result).toEqual({ session, status: 200 });
  });
});
