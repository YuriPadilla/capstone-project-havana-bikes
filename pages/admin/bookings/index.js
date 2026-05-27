import { useSession } from "next-auth/react";
import { useState } from "react";
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

async function getErrorMessage(response) {
  try {
    const errorData = await response.json();

    return (
      errorData.message ||
      errorData.error ||
      "Booking status could not be updated. Please try again."
    );
  } catch (error) {
    return "Booking status could not be updated. Please try again.";
  }
}

export default function AdminBookingsPage() {
  const { status } = useSession();
  const {
    data: bookings,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/bookings", fetchAdminBookings);
  const [updateError, setUpdateError] = useState("");
  const [updatingBookingId, setUpdatingBookingId] = useState("");

  async function updateBookingStatus(bookingId, nextStatus) {
    setUpdateError("");
    setUpdatingBookingId(bookingId);

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        setUpdateError(errorMessage);
        return;
      }

      await mutate();
    } catch (error) {
      setUpdateError("Booking status could not be updated. Please try again.");
    } finally {
      setUpdatingBookingId("");
    }
  }

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
        {updateError && <StyledErrorMessage>{updateError}</StyledErrorMessage>}
        {bookings?.length === 0 && (
          <StyledStateMessage>No booking requests yet.</StyledStateMessage>
        )}
        {bookings?.length > 0 && (
          <AdminBookingsList
            bookings={bookings}
            onUpdateStatus={updateBookingStatus}
            updatingBookingId={updatingBookingId}
          />
        )}
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
