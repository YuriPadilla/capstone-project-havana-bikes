import styled from "styled-components";
import Link from "next/link";

export const StyledAdminNavigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-m);
  margin-bottom: var(--space-l);
`;

export const StyledAdminLink = styled(Link)`
  color: inherit;
`;

export const StyledLogoutButton = styled.button`
  min-height: 2.75rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
  color: black;
  font: inherit;
  touch-action: manipulation;

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;
