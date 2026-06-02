import styled from "styled-components";

const StyledCard = styled.article`
  display: grid;
  gap: var(--space-m);
  padding: var(--space-m);
  border: ${({ $isUnread }) =>
    $isUnread ? "2px solid #5cafa5" : "1px solid #d7ddd8"};
  border-radius: var(--radius-s);
  background: ${({ $isUnread }) => ($isUnread ? "#eefaf8" : "#ffffff")};
`;

const StyledHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-s);
`;

const StyledTitle = styled.h4`
  margin: 0;
`;

const StyledStatus = styled.span`
  font-weight: 700;
`;

const StyledDetails = styled.div`
  display: grid;
  gap: var(--space-s);
`;

const StyledText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

function formatDate(date) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString("en-US");
}

function getLatestMessagePreview(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return "No message available.";
  }

  const latestMessage = messages[messages.length - 1]?.message || "";

  if (latestMessage.length <= 120) {
    return latestMessage;
  }

  return `${latestMessage.slice(0, 120)}...`;
}

export default function AdminMessageCard({ conversation }) {
  const status = conversation.status || "open";
  const isUnread =
    conversation.unread === true ||
    conversation.isRead === false ||
    (!conversation.readAt && status === "open");
  const date = conversation.updatedAt || conversation.createdAt;

  return (
    <StyledCard $isUnread={isUnread}>
      <StyledHeader>
        <StyledTitle>{conversation.customerName || "Unknown customer"}</StyledTitle>
        <StyledStatus>{status}</StyledStatus>
      </StyledHeader>
      <StyledDetails>
        <StyledText>{conversation.customerEmail || "No email available"}</StyledText>
        <StyledText>{getLatestMessagePreview(conversation.messages)}</StyledText>
        <StyledText>Last update: {formatDate(date)}</StyledText>
      </StyledDetails>
    </StyledCard>
  );
}
