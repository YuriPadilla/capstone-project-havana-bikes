import { useSession } from "next-auth/react";
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

const fetchAdminMessages = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Messages could not be loaded.");
  }

  return response.json();
};

export default function AdminMessagesPage() {
  const { status } = useSession();
  const {
    data: conversations,
    error,
    isLoading,
  } = useSWR("/api/messages", fetchAdminMessages);

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
        {isLoading && <StyledStateMessage>Loading messages...</StyledStateMessage>}
        {error && (
          <StyledErrorMessage>
            Messages could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {conversations?.length === 0 && (
          <StyledStateMessage>No messages yet.</StyledStateMessage>
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
