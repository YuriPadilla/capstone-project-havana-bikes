import { useSession } from "next-auth/react";
import useSWR from "swr";
import styled from "styled-components";
import AdminBookingsList from "@/components/AdminBookingsList";
import AdminNavigation from "@/components/AdminNavigation";
import StandardSectionApp from "@/components/StandardSectionApp";
import { getAdminSession } from "@/utils/auth";

const StyledAdminWrapper = styled.div`
  max-width: 44rem;
  margin: 0 auto;
`;

const StyledText = styled.p`
  line-height: 1.5;
`;

const StyledStateMessage = styled.p`
  padding: var(--space-m);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  background: #ffffff;
  line-height: 1.5;
`;

const StyledErrorMessage = styled(StyledStateMessage)`
  border-color: #8f1d1d;
  color: #8f1d1d;
`;

const fetchAdminBookings = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Bookings could not be loaded.");
  }

  return response.json();
};

export default function AdminBookingsPage() {
  const { status } = useSession();
  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR("/api/admin/bookings", fetchAdminBookings);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin Bookings">
        <StyledAdminWrapper>
          <StyledText>Loading...</StyledText>
        </StyledAdminWrapper>
      </StandardSectionApp>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <StandardSectionApp sectionTitle="Booking requests">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>
          This page shows rental booking requests received by Havana Bikes.
        </StyledText>
        {isLoading && (
          <StyledStateMessage>Loading booking requests...</StyledStateMessage>
        )}
        {error && (
          <StyledErrorMessage>
            Booking requests could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {bookings?.length === 0 && (
          <StyledStateMessage>No booking requests yet.</StyledStateMessage>
        )}
        {bookings?.length > 0 && <AdminBookingsList bookings={bookings} />}
      </StyledAdminWrapper>
    </StandardSectionApp>
  );
}

export async function getServerSideProps({ req, res }) {
  const { status } = await getAdminSession(req, res);

  if (status === 401) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (status === 403) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
