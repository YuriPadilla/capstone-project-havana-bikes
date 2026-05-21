import styled from "styled-components";
import { StyledLinkAsButton } from "../Button/Button.styled";

export const StyledTable = styled.table`
  width: 100%;
  border: none;
  border-spacing: 0;
`;

export const StyledTr = styled.tr`
  border: none;
  &:nth-child(odd) {
    background-color: #d9f5f3;
  }
  &:nth-child(even) {
    background-color: rgb(211, 245, 197);
  }
`;

export const StyledTd = styled.td`
  padding: 0.45rem;
  vertical-align: middle;
  overflow-wrap: anywhere;
`;

export const StyledSectionLink = styled(StyledLinkAsButton)`
  position: static;
  margin-top: var(--space-m);
`;
