import styled from "styled-components";

const statusLabels = {
  not_sent: "Email not sent",
  sent: "Email sent",
  failed: "Email failed",
};

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 1.75rem;
  padding: 0 var(--space-s);
  border: 1px solid
    ${({ $status }) => {
      if ($status === "sent") {
        return "#2c6b3f";
      }

      if ($status === "failed") {
        return "#8f1d1d";
      }

      return "#8b8f94";
    }};
  border-radius: var(--radius-s);
  background: ${({ $status }) => {
    if ($status === "sent") {
      return "#edf8f0";
    }

    if ($status === "failed") {
      return "#fff0f0";
    }

    return "#f0f1f2";
  }};
  color: ${({ $status }) => ($status === "failed" ? "#8f1d1d" : "#202124")};
  font-size: 0.875rem;
  font-weight: 700;
`;

export default function EmailStatusBadge({ status }) {
  const safeStatus = statusLabels[status] ? status : "not_sent";

  return (
    <StyledBadge $status={safeStatus} role="status">
      {statusLabels[safeStatus]}
    </StyledBadge>
  );
}
