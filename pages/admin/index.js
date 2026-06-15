import { useSession } from "next-auth/react";
import useSWR from "swr";
import styled from "styled-components";
import AdminNavigation from "@/components/AdminNavigation";
import StandardSectionApp from "@/components/StandardSectionApp";
import { getAdminSession } from "@/utils/auth";

async function fetchVisitStats(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Visit statistics could not be loaded");
  }

  return response.json();
}

const StyledAdminWrapper = styled.div`
  max-width: 44rem;
  margin: 0 auto;
`;

const StyledText = styled.p`
  line-height: 1.5;
`;

const StyledEmail = styled.p`
  font-weight: 700;
`;

const StyledStatsCard = styled.section`
  max-width: 20rem;
  margin: var(--space-l) 0;
  padding: var(--space-m);
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  background-color: rgb(247, 249, 247);
`;

const StyledStatsLabel = styled.h4`
  margin: 0 0 var(--space-s);
`;

const StyledStatsValue = styled.p`
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
`;

const StyledStateMessage = styled.p`
  margin: 0;
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

export default function AdminPage() {
  const { data: session, status } = useSession();
  const {
    data: visitStats,
    error,
    isLoading,
  } = useSWR("/api/visits", fetchVisitStats);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin area">
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
    <StandardSectionApp sectionTitle="Admin Dashboard">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>
          This area will be used to manage bookings and business tools for
          Havana Bikes.
        </StyledText>
        <StyledStatsCard>
          <StyledStatsLabel>Total public visits</StyledStatsLabel>
          {isLoading && (
            <StyledStateMessage>
              Loading visit statistics...
            </StyledStateMessage>
          )}
          {error && (
            <StyledErrorMessage>
              Visit statistics could not be loaded. Please try again later.
            </StyledErrorMessage>
          )}
          {!isLoading && !error && (
            <StyledStatsValue>{visitStats?.totalVisits ?? 0}</StyledStatsValue>
          )}
        </StyledStatsCard>
        <StyledEmail>Logged in as: {session.user.email}</StyledEmail>
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
