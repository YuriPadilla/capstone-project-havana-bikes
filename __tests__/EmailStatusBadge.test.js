import { render, screen } from "@testing-library/react";
import EmailStatusBadge from "@/components/EmailStatusBadge";

describe("EmailStatusBadge", () => {
  test.each([
    ["sent", "Email sent"],
    ["failed", "Email failed"],
    ["not_sent", "Email not sent"],
    ["unknown", "Email not sent"],
  ])("shows the expected label for %s", (status, label) => {
    render(<EmailStatusBadge status={status} />);

    expect(screen.getByRole("status")).toHaveTextContent(label);
  });
});
