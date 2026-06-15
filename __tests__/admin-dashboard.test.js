import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import AdminPage from "@/pages/admin";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("swr", () => jest.fn());

jest.mock("@/utils/auth", () => ({
  getAdminSession: jest.fn(),
}));

describe("Admin dashboard", () => {
  test("shows the total number of public visits", () => {
    useSession.mockReturnValue({
      data: {
        user: {
          email: "admin@example.test",
          role: "admin",
        },
      },
      status: "authenticated",
    });
    useSWR.mockReturnValue({
      data: { totalVisits: 42 },
      error: undefined,
      isLoading: false,
    });

    render(<AdminPage />);

    expect(
      screen.getByRole("heading", { name: "Total public visits" })
    ).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});
