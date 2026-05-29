import { useSession } from "next-auth/react";
import useSWR from "swr";
import styled from "styled-components";
import AdminBikesList from "@/components/AdminBikesList";
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

const fetchAdminBikes = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Bikes could not be loaded.");
  }

  return response.json();
};

export default function AdminBikesPage() {
  const { status } = useSession();
  const {
    data: bikes,
    error,
    isLoading,
  } = useSWR("/api/admin/bikes", fetchAdminBikes);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin Bikes">
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
    <StandardSectionApp sectionTitle="Bike inventory">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>
          This page shows all bikes in the inventory, including inactive bikes.
        </StyledText>
        {isLoading && <StyledStateMessage>Loading bikes...</StyledStateMessage>}
        {error && (
          <StyledErrorMessage>
            Bikes could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {bikes?.length === 0 && (
          <StyledStateMessage>No bikes have been added yet.</StyledStateMessage>
        )}
        {bikes?.length > 0 && <AdminBikesList bikes={bikes} />}
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
