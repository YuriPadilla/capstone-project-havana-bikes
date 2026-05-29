import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
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

const StyledActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 2.75rem;
  margin: var(--space-s) 0 var(--space-m);
  padding: 0.55rem 0.9rem;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
  color: black;
  font: inherit;
  text-decoration: none;
  touch-action: manipulation;

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;

const fetchAdminBikes = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Bikes could not be loaded.");
  }

  return response.json();
};

async function getErrorMessage(response) {
  try {
    const errorData = await response.json();

    return (
      errorData.message ||
      errorData.error ||
      "Bike status could not be updated. Please try again."
    );
  } catch (error) {
    return "Bike status could not be updated. Please try again.";
  }
}

export default function AdminBikesPage() {
  const { status } = useSession();
  const {
    data: bikes,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/admin/bikes", fetchAdminBikes);
  const [updateError, setUpdateError] = useState("");
  const [updatingBikeId, setUpdatingBikeId] = useState("");

  async function updateBikeStatus(bikeId, nextIsActive) {
    setUpdateError("");
    setUpdatingBikeId(bikeId);

    try {
      const response = await fetch(`/api/admin/bikes/${bikeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: nextIsActive }),
      });

      if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        setUpdateError(errorMessage);
        return;
      }

      await mutate();
    } catch (error) {
      setUpdateError("Bike status could not be updated. Please try again.");
    } finally {
      setUpdatingBikeId("");
    }
  }

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
        <StyledActionLink href="/admin/bikes/new">Add new bike</StyledActionLink>
        {isLoading && <StyledStateMessage>Loading bikes...</StyledStateMessage>}
        {error && (
          <StyledErrorMessage>
            Bikes could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {updateError && <StyledErrorMessage>{updateError}</StyledErrorMessage>}
        {bikes?.length === 0 && (
          <StyledStateMessage>No bikes have been added yet.</StyledStateMessage>
        )}
        {bikes?.length > 0 && (
          <AdminBikesList
            bikes={bikes}
            onUpdateStatus={updateBikeStatus}
            updatingBikeId={updatingBikeId}
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
