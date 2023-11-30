import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border: none;
`;

export const StyledTr = styled.tr`
  border: none;
  &:nth-child(odd) {
    background-color: rgb(211, 245, 197);
  }
  &:nth-child(even) {
    background-color: #d9f5f3;
  }
`;

export const StyledTd = styled.td`
  padding: 0.1rem;
`;
