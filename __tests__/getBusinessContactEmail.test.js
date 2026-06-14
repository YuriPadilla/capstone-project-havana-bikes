import dbConnect from "../db/connect";
import SiteSettings from "../db/models/SiteSettings";
import { getBusinessContactEmail } from "@/utils/email/getBusinessContactEmail";

jest.mock("../db/connect", () => jest.fn());

jest.mock("../db/models/SiteSettings", () => ({
  findOne: jest.fn(),
}));

const originalEnv = process.env;

describe("getBusinessContactEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.BUSINESS_CONTACT_EMAIL;
    dbConnect.mockResolvedValue();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test("returns the email from SiteSettings when it is valid", async () => {
    SiteSettings.findOne.mockResolvedValue({
      email: " contact@example.test ",
    });
    process.env.BUSINESS_CONTACT_EMAIL = "fallback@example.test";

    await expect(getBusinessContactEmail()).resolves.toBe(
      "contact@example.test"
    );
    expect(dbConnect).toHaveBeenCalled();
  });

  test("returns the environment fallback when SiteSettings has no valid email", async () => {
    SiteSettings.findOne.mockResolvedValue({ email: "invalid-email" });
    process.env.BUSINESS_CONTACT_EMAIL = " fallback@example.test ";

    await expect(getBusinessContactEmail()).resolves.toBe(
      "fallback@example.test"
    );
  });

  test("returns null when no valid email is available", async () => {
    SiteSettings.findOne.mockResolvedValue(null);
    process.env.BUSINESS_CONTACT_EMAIL = "invalid-email";

    await expect(getBusinessContactEmail()).resolves.toBeNull();
  });
});
