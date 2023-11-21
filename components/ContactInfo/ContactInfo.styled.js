import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border: none;
  margin-bottom: 25px;
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
  vertical-align: center;
`;
