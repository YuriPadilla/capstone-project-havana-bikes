import { buildContactConfirmationEmail } from "@/utils/buildContactConfirmationEmail";

describe("buildContactConfirmationEmail", () => {
  test("includes the customer name, original message and expected subject", () => {
    const email = buildContactConfirmationEmail({
      customerName: "Ana",
      message: "I would like to rent two bikes.",
    });

    expect(email.subject).toBe("We received your message — Havana Bikes");
    expect(email.text).toContain("Hello Ana,");
    expect(email.text).toContain("I would like to rent two bikes.");
  });

  test("includes available business contact information", () => {
    const email = buildContactConfirmationEmail({
      customerName: "Ana",
      message: "Hello",
      siteSettings: {
        email: "contact@example.test",
        phone: "+53 555 0100",
        whatsapp: "+53 555 0200",
        address: "La Habana, Cuba",
      },
    });

    expect(email.text).toContain("Email: contact@example.test");
    expect(email.text).toContain("Phone: +53 555 0100");
    expect(email.text).toContain("WhatsApp: +53 555 0200");
    expect(email.text).toContain("Address: La Habana, Cuba");
  });
});
