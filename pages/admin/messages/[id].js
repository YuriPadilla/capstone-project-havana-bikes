import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useSWRConfig } from "swr";
import styled from "styled-components";
import AdminNavigation from "@/components/AdminNavigation";
import AdminMessageStatusBadge from "@/components/AdminMessageStatusBadge";
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

const StyledReplyForm = styled.form`
  display: grid;
  gap: var(--space-s);
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 8rem;
  padding: var(--space-s);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  font: inherit;
  resize: vertical;
`;

const StyledSubmitButton = styled.button`
  width: fit-content;
  min-height: 2.75rem;
  padding: var(--space-s) var(--space-m);
  border: none;
  border-radius: var(--radius-s);
  background: var(--color-primary);
  color: var(--color-surface);
  font: inherit;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;

const StyledArchiveButton = styled(StyledSubmitButton)`
  margin-top: var(--space-s);
  background: #4b5563;
`;

const StyledSuccessMessage = styled(StyledStateMessage)`
  border-color: #2c6b3f;
  color: #2c6b3f;
`;

const StyledWarningMessage = styled(StyledStateMessage)`
  border-color: #8a6500;
  color: #6b4f00;
  background: #fff9e8;
`;

const StyledEmailStatus = styled.p`
  margin: 0;
  font-size: 0.875rem;
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

function getEmailStatusLabel(emailStatus) {
  if (emailStatus === "sent") {
    return "Email sent";
  }

  if (emailStatus === "failed") {
    return "Email not sent";
  }

  if (emailStatus === "pending") {
    return "Email pending";
  }

  return "";
}

async function getErrorMessage(
  response,
  fallback = "Reply could not be saved. Please try again."
) {
  try {
    const errorData = await response.json();

    return errorData.message || errorData.error || fallback;
  } catch (error) {
    return fallback;
  }
}

export default function AdminMessageDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const { mutate: mutateMessagesList } = useSWRConfig();
  const {
    data: conversation,
    error,
    isLoading,
    mutate: mutateConversation,
  } = useSWR(id ? `/api/messages/${id}` : null, fetchConversation);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replySuccess, setReplySuccess] = useState("");
  const [replyWarning, setReplyWarning] = useState("");
  const [replyError, setReplyError] = useState("");
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveSuccess, setArchiveSuccess] = useState("");
  const [archiveError, setArchiveError] = useState("");
  const hasAttemptedMarkAsRead = useRef(false);
  const sortedMessages = getSortedMessages(conversation?.messages);

  useEffect(() => {
    async function markConversationAsRead() {
      try {
        const response = await fetch(`/api/messages/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "read" }),
        });

        if (!response.ok) {
          return;
        }

        const updatedConversation = await response.json();

        await mutateConversation(updatedConversation, false);
        await mutateMessagesList("/api/messages");
      } catch (error) {
        return;
      }
    }

    if (
      !id ||
      conversation?.status !== "new" ||
      hasAttemptedMarkAsRead.current
    ) {
      return;
    }

    hasAttemptedMarkAsRead.current = true;
    markConversationAsRead();
  }, [
    conversation?.status,
    id,
    mutateConversation,
    mutateMessagesList,
  ]);

  function handleReplyMessageChange(event) {
    setReplyMessage(event.target.value);
    setReplySuccess("");
    setReplyWarning("");
  }

  async function handleArchiveConversation() {
    setArchiveSuccess("");
    setArchiveError("");

    setIsArchiving(true);

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "archived" }),
      });

      if (!response.ok) {
        const errorMessage = await getErrorMessage(
          response,
          "Conversation could not be archived. Please try again."
        );
        setArchiveError(errorMessage);
        return;
      }

      const updatedConversation = await response.json();

      setArchiveSuccess("Conversation archived successfully.");
      await mutateConversation(updatedConversation, false);
      await mutateMessagesList("/api/messages");
    } catch (error) {
      setArchiveError("Conversation could not be archived. Please try again.");
    } finally {
      setIsArchiving(false);
    }
  }

  async function handleSubmitReply(event) {
    event.preventDefault();
    const cleanMessage = replyMessage.trim();

    setReplySuccess("");
    setReplyWarning("");
    setReplyError("");

    if (!cleanMessage) {
      setReplyError("Please write a reply before sending.");
      return;
    }

    setIsSubmittingReply(true);

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: cleanMessage }),
      });

      if (!response.ok) {
        const errorMessage = await getErrorMessage(response);
        setReplyError(errorMessage);
        return;
      }

      const updatedConversation = await response.json();
      const latestMessage =
        updatedConversation.messages?.[
          updatedConversation.messages.length - 1
        ];

      setReplyMessage("");

      if (
        latestMessage?.sender === "admin" &&
        latestMessage.emailStatus === "sent"
      ) {
        setReplySuccess("Reply saved and sent by email.");
      } else {
        setReplyWarning(
          "Reply saved in the conversation history, but the email could not be sent. Please contact the customer manually."
        );
      }

      await mutateConversation(updatedConversation, false);
      await mutateMessagesList("/api/messages");
    } catch (error) {
      setReplyError("Reply could not be saved. Please try again.");
    } finally {
      setIsSubmittingReply(false);
    }
  }

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
              <AdminMessageStatusBadge status={conversation.status} />
              <StyledText>
                Last update:{" "}
                {formatDate(conversation.updatedAt || conversation.createdAt)}
              </StyledText>
              {archiveSuccess && (
                <StyledSuccessMessage>{archiveSuccess}</StyledSuccessMessage>
              )}
              {archiveError && (
                <StyledErrorMessage>{archiveError}</StyledErrorMessage>
              )}
              {conversation.status !== "archived" && (
                <StyledArchiveButton
                  type="button"
                  disabled={isArchiving}
                  onClick={handleArchiveConversation}
                >
                  {isArchiving ? "Archiving..." : "Archive conversation"}
                </StyledArchiveButton>
              )}
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
                      {message.sender === "admin" &&
                        getEmailStatusLabel(message.emailStatus) && (
                          <StyledEmailStatus>
                            {getEmailStatusLabel(message.emailStatus)}
                          </StyledEmailStatus>
                        )}
                    </StyledMessageItem>
                  ))}
                </StyledMessageList>
              ) : (
                <StyledText>No messages yet.</StyledText>
              )}
            </StyledSection>
            <StyledSection>
              <StyledSectionTitle>Reply to this conversation</StyledSectionTitle>
              {replySuccess && (
                <StyledSuccessMessage>{replySuccess}</StyledSuccessMessage>
              )}
              {replyWarning && (
                <StyledWarningMessage>{replyWarning}</StyledWarningMessage>
              )}
              {replyError && (
                <StyledErrorMessage>{replyError}</StyledErrorMessage>
              )}
              <StyledReplyForm onSubmit={handleSubmitReply}>
                <label htmlFor="replyMessage">Admin reply</label>
                <StyledTextarea
                  id="replyMessage"
                  name="replyMessage"
                  value={replyMessage}
                  onChange={handleReplyMessageChange}
                  placeholder="Write a reply..."
                />
                <StyledSubmitButton
                  type="submit"
                  disabled={isSubmittingReply || replyMessage.trim() === ""}
                >
                  {isSubmittingReply ? "Sending..." : "Send reply"}
                </StyledSubmitButton>
              </StyledReplyForm>
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
