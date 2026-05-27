import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
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

const StyledAdminLink = styled(Link)`
  color: inherit;
`;

const StyledTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 42rem;
  border-collapse: collapse;
`;

const StyledTableHeader = styled.th`
  padding: 0.6rem;
  text-align: left;
  border-bottom: 1px solid #9a9e9b;
`;

const StyledTableCell = styled.td`
  padding: 0.6rem;
  vertical-align: top;
  border-bottom: 1px solid #d7ddd8;
`;

const fetchAdminBookings = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Bookings could not be loaded.");
  }

  return response.json();
};

function formatDate(date) {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString("en-US");
}

function getBikeLabel(bike) {
  if (!bike) {
    return "";
  }

  if (typeof bike === "string") {
    return bike;
  }

  return bike.name || bike.brand || bike._id;
}

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
    <StandardSectionApp sectionTitle="Admin Bookings">
      <StyledAdminWrapper>
        <AdminNavigation />
        {isLoading && <StyledText>Loading bookings...</StyledText>}
        {error && (
          <StyledText>
            Bookings could not be loaded. Please try again later.
          </StyledText>
        )}
        {bookings?.length === 0 && (
          <StyledText>No bookings have been created yet.</StyledText>
        )}
        {bookings?.length > 0 && (
          <StyledTableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <StyledTableHeader>Customer</StyledTableHeader>
                  <StyledTableHeader>Bikes</StyledTableHeader>
                  <StyledTableHeader>Dates</StyledTableHeader>
                  <StyledTableHeader>Total</StyledTableHeader>
                  <StyledTableHeader>Status</StyledTableHeader>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <StyledTableCell>
                      {booking.customerName}
                      <br />
                      {booking.customerEmail}
                      {booking.customerPhone && (
                        <>
                          <br />
                          {booking.customerPhone}
                        </>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {booking.selectedBikes?.map(getBikeLabel).join(", ")}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatDate(booking.fromDate)} -{" "}
                      {formatDate(booking.untilDate)}
                    </StyledTableCell>
                    <StyledTableCell>${booking.totalPrice}</StyledTableCell>
                    <StyledTableCell>{booking.status}</StyledTableCell>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </StyledTableWrapper>
        )}
        <StyledAdminLink href="/admin">Back to admin dashboard</StyledAdminLink>
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
