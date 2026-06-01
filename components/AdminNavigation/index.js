import { signOut } from "next-auth/react";
import {
  StyledAdminLink,
  StyledAdminNavigation,
  StyledLogoutButton,
} from "./AdminNavigation.styled";

export default function AdminNavigation() {
  return (
    <StyledAdminNavigation aria-label="Admin navigation">
      <StyledAdminLink href="/admin">Dashboard</StyledAdminLink>
      <StyledAdminLink href="/admin/bookings">Bookings</StyledAdminLink>
      <StyledAdminLink href="/admin/bikes">Bikes</StyledAdminLink>
      <StyledAdminLink href="/admin/settings">Settings</StyledAdminLink>
      <StyledLogoutButton
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Log out
      </StyledLogoutButton>
    </StyledAdminNavigation>
  );
}
