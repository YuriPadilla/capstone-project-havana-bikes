import SiteSettings from "../db/models/SiteSettings";
import { getAdminReplyEmail } from "@/utils/email/getAdminReplyEmail";

jest.mock("../db/models/SiteSettings", () => ({
  findOne: jest.fn(),
}));

describe("getAdminReplyEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("builds a reply email with customer and business contact details", async () => {
    SiteSettings.findOne.mockResolvedValue({
      toObject: () => ({
        businessName: "Havana Bikes",
        email: "contact@example.test",
        phone: "+53 555 0100",
        whatsapp: "+53 555 0200",
        address: "La Habana, Cuba",
      }),
    });

    const email = await getAdminReplyEmail({
      customerName: "Ana",
      message: "Yes, bikes are available.",
    });

    expect(email.subject).toBe("Reply from Havana Bikes");
    expect(email.text).toContain("Hello Ana,");
    expect(email.text).toContain("Yes, bikes are available.");
    expect(email.text).toContain("Email: contact@example.test");
    expect(email.text).toContain("Phone: +53 555 0100");
    expect(email.text).toContain("WhatsApp: +53 555 0200");
    expect(email.text).toContain("Address: La Habana, Cuba");
  });
});
