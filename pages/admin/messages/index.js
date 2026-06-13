import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import AdminMessagesList from "@/components/AdminMessagesList";
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

const StyledFilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
  margin: var(--space-m) 0;
`;

const StyledFilterButton = styled.button`
  min-height: 2.5rem;
  padding: var(--space-s) var(--space-m);
  border: 1px solid ${({ $isActive }) => ($isActive ? "#5cafa5" : "#d7ddd8")};
  border-radius: var(--radius-s);
  background: ${({ $isActive }) => ($isActive ? "#eefaf8" : "#ffffff")};
  color: black;
  font: inherit;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "400")};
  cursor: pointer;

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;

const fetchAdminMessages = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Messages could not be loaded.");
  }

  return response.json();
};

export default function AdminMessagesPage() {
  const { status } = useSession();
  const [view, setView] = useState("inbox");
  const {
    data: conversations,
    error,
    isLoading,
  } = useSWR(`/api/messages?view=${view}`, fetchAdminMessages);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin Messages">
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
    <StandardSectionApp sectionTitle="Customer messages">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledText>
          This page shows customer messages received from the contact form.
        </StyledText>
        <StyledFilterGroup aria-label="Message filters">
          <StyledFilterButton
            type="button"
            $isActive={view === "inbox"}
            aria-pressed={view === "inbox"}
            onClick={() => setView("inbox")}
          >
            Inbox
          </StyledFilterButton>
          <StyledFilterButton
            type="button"
            $isActive={view === "archived"}
            aria-pressed={view === "archived"}
            onClick={() => setView("archived")}
          >
            Archived
          </StyledFilterButton>
        </StyledFilterGroup>
        {isLoading && <StyledStateMessage>Loading messages...</StyledStateMessage>}
        {error && (
          <StyledErrorMessage>
            Messages could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {conversations?.length === 0 && (
          <StyledStateMessage>
            {view === "archived"
              ? "No archived messages yet."
              : "No messages yet."}
          </StyledStateMessage>
        )}
        {conversations?.length > 0 && (
          <AdminMessagesList conversations={conversations} />
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
