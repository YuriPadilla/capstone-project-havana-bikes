import styled from "styled-components";
import AdminMessageCard from "@/components/AdminMessageCard";

const StyledList = styled.ul`
  display: grid;
  gap: var(--space-m);
  margin: var(--space-l) 0 0;
  padding: 0;
  list-style: none;
`;

export default function AdminMessagesList({ conversations }) {
  return (
    <StyledList>
      {conversations.map((conversation, index) => (
        <li key={conversation._id || index}>
          <AdminMessageCard conversation={conversation} />
        </li>
      ))}
    </StyledList>
  );
}
