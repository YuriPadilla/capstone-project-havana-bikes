import { getBusinessContactEmail } from "@/utils/email/getBusinessContactEmail";
import { sendAdminMessageNotificationEmail } from "@/utils/email/sendAdminMessageNotificationEmail";
import { sendEmail } from "@/utils/email/sendEmail";

jest.mock("@/utils/email/getBusinessContactEmail", () => ({
  getBusinessContactEmail: jest.fn(),
}));

jest.mock("@/utils/email/sendEmail", () => ({
  sendEmail: jest.fn(),
}));

describe("sendAdminMessageNotificationEmail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getBusinessContactEmail.mockResolvedValue("admin@example.test");
    sendEmail.mockResolvedValue({
      success: true,
      messageId: "message-id",
    });
  });

  test("sends the notification to the business contact email", async () => {
    await sendAdminMessageNotificationEmail({
      customerName: "Ana",
      customerEmail: "ana@example.test",
      message: "I would like to rent a bike.",
      createdAt: "2026-06-14T10:30:00.000Z",
    });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "admin@example.test",
        subject: "New message from Havana Bikes website",
      })
    );
  });

  test("includes customer and conversation details in the email text", async () => {
    await sendAdminMessageNotificationEmail({
      customerName: "Ana",
      customerEmail: "ana@example.test",
      message: "I would like to rent a bike.",
      createdAt: "2026-06-14T10:30:00.000Z",
    });

    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Customer name: Ana"),
      })
    );
    const { text } = sendEmail.mock.calls[0][0];

    expect(text).toContain("Customer email: ana@example.test");
    expect(text).toContain("Message: I would like to rent a bike.");
    expect(text).toContain("Created at: 2026-06-14T10:30:00.000Z");
    expect(text).toContain("Sign in to the admin area");
  });

  test("returns a controlled failure when no business contact email exists", async () => {
    getBusinessContactEmail.mockResolvedValue(null);

    const result = await sendAdminMessageNotificationEmail({
      customerName: "Ana",
      customerEmail: "ana@example.test",
      message: "Hello",
      createdAt: "2026-06-14T10:30:00.000Z",
    });

    expect(result).toEqual({
      success: false,
      error: "Business contact email is not configured.",
    });
    expect(sendEmail).not.toHaveBeenCalled();
  });
});
