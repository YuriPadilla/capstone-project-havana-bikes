import styled from "styled-components";
import Link from "next/link";
import AdminMessageCard from "@/components/AdminMessageCard";

const StyledList = styled.ul`
  display: grid;
  gap: var(--space-m);
  margin: var(--space-l) 0 0;
  padding: 0;
  list-style: none;
`;

const StyledConversationLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 3px;
  }
`;

export default function AdminMessagesList({ conversations }) {
  return (
    <StyledList>
      {conversations.map((conversation, index) => (
        <li key={conversation._id || index}>
          {conversation._id ? (
            <StyledConversationLink href={`/admin/messages/${conversation._id}`}>
              <AdminMessageCard conversation={conversation} />
            </StyledConversationLink>
          ) : (
            <AdminMessageCard conversation={conversation} />
          )}
        </li>
      ))}
    </StyledList>
  );
}
