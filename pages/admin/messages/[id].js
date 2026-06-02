import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
  margin: 0;
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

const StyledSection = styled.section`
  display: grid;
  gap: var(--space-s);
  margin-top: var(--space-l);
  padding: var(--space-m);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  background: #ffffff;
`;

const StyledSectionTitle = styled.h4`
  margin: 0;
`;

const StyledBackLink = styled(Link)`
  display: inline-block;
  margin-top: var(--space-m);
  color: black;
  font-weight: 700;
`;

const StyledMessageList = styled.ul`
  display: grid;
  gap: var(--space-m);
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledMessageItem = styled.li`
  display: grid;
  gap: var(--space-xs);
  justify-self: ${({ $sender }) => ($sender === "admin" ? "end" : "start")};
  width: min(100%, 34rem);
  padding: var(--space-m);
  border: 1px solid
    ${({ $sender }) => ($sender === "admin" ? "#5cafa5" : "#d7ddd8")};
  border-radius: var(--radius-s);
  background: ${({ $sender }) =>
    $sender === "admin" ? "#eefaf8" : "#f9fffb"};
`;

const StyledMessageMeta = styled.p`
  margin: 0;
  font-weight: 700;
`;

const fetchConversation = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("Conversation could not be loaded.");
    error.status = response.status;
    throw error;
  }

  return response.json();
};

function formatDate(date) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString("en-US");
}

function getSortedMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return [...messages].sort((firstMessage, secondMessage) => {
    return (
      new Date(firstMessage.createdAt).getTime() -
      new Date(secondMessage.createdAt).getTime()
    );
  });
}

function getSenderLabel(sender) {
  if (sender === "admin") {
    return "Admin";
  }

  return "Customer";
}

export default function AdminMessageDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const {
    data: conversation,
    error,
    isLoading,
  } = useSWR(id ? `/api/messages/${id}` : null, fetchConversation);
  const sortedMessages = getSortedMessages(conversation?.messages);

  if (status === "loading") {
    return (
      <StandardSectionApp sectionTitle="Admin Message">
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
    <StandardSectionApp sectionTitle="Message conversation">
      <StyledAdminWrapper>
        <AdminNavigation />
        <StyledBackLink href="/admin/messages">Back to messages</StyledBackLink>
        {isLoading && (
          <StyledStateMessage>Loading conversation...</StyledStateMessage>
        )}
        {error?.status === 404 && (
          <StyledErrorMessage>Conversation not found.</StyledErrorMessage>
        )}
        {error?.status === 400 && (
          <StyledErrorMessage>Invalid conversation id.</StyledErrorMessage>
        )}
        {error && ![400, 404].includes(error.status) && (
          <StyledErrorMessage>
            Conversation could not be loaded. Please try again later.
          </StyledErrorMessage>
        )}
        {conversation && (
          <>
            <StyledSection>
              <StyledSectionTitle>Customer</StyledSectionTitle>
              <StyledText>
                {conversation.customerName || "Unknown customer"}
              </StyledText>
              <StyledText>
                {conversation.customerEmail || "No email available"}
              </StyledText>
              <StyledText>Status: {conversation.status || "open"}</StyledText>
              <StyledText>
                Last update:{" "}
                {formatDate(conversation.updatedAt || conversation.createdAt)}
              </StyledText>
            </StyledSection>
            <StyledSection>
              <StyledSectionTitle>Message history</StyledSectionTitle>
              {sortedMessages.length > 0 ? (
                <StyledMessageList>
                  {sortedMessages.map((message, index) => (
                    <StyledMessageItem
                      key={message._id || index}
                      $sender={message.sender}
                    >
                      <StyledMessageMeta>
                        {getSenderLabel(message.sender)} -{" "}
                        {formatDate(message.createdAt)}
                      </StyledMessageMeta>
                      <StyledText>
                        {message.message || "No message content available."}
                      </StyledText>
                    </StyledMessageItem>
                  ))}
                </StyledMessageList>
              ) : (
                <StyledText>No messages yet.</StyledText>
              )}
            </StyledSection>
          </>
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
