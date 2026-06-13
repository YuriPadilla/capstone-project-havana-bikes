import styled from "styled-components";

const statusLabels = {
  new: "New",
  read: "Read",
  replied: "Replied",
  archived: "Archived",
};

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 1.75rem;
  padding: 0 var(--space-s);
  border: 1px solid
    ${({ $status }) => {
      if ($status === "new") {
        return "#5cafa5";
      }

      if ($status === "archived") {
        return "#8b8f94";
      }

      return "#d7ddd8";
    }};
  border-radius: var(--radius-s);
  background: ${({ $status }) => {
    if ($status === "new") {
      return "#eefaf8";
    }

    if ($status === "archived") {
      return "#f0f1f2";
    }

    return "#ffffff";
  }};
  color: black;
  font-size: 0.875rem;
  font-weight: 700;
`;

export default function AdminMessageStatusBadge({ status }) {
  const label = statusLabels[status] || "Unknown";

  return <StyledBadge $status={status}>{label}</StyledBadge>;
}
