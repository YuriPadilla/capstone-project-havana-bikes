import styled from "styled-components";
import AdminBookingCard from "@/components/AdminBookingCard";

const StyledList = styled.ul`
  display: grid;
  gap: var(--space-m);
  margin: var(--space-l) 0 0;
  padding: 0;
  list-style: none;
`;

export default function AdminBookingsList({ bookings }) {
  return (
    <StyledList>
      {bookings.map((booking) => (
        <li key={booking._id}>
          <AdminBookingCard booking={booking} />
        </li>
      ))}
    </StyledList>
  );
}
