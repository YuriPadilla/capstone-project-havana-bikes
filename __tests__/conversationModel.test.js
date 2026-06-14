/** @jest-environment node */

import Conversation from "../db/models/Conversation";

describe("Conversation email tracking", () => {
  test("adds safe defaults for customer and admin email tracking", () => {
    const conversation = new Conversation({
      customerName: "Test User",
      customerEmail: "test@example.com",
      messages: [
        {
          sender: "customer",
          message: "Hello Havana Bikes",
        },
      ],
    });

    expect(conversation.confirmationEmail.status).toBe("not_sent");
    expect(conversation.adminNotificationEmail.status).toBe("not_sent");
    expect(conversation.validateSync()).toBeUndefined();
  });
});
