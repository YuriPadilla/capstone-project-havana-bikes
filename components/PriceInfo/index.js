import styled from "styled-components";
import { StyledLinkAsButton } from "../Button/Button.styled.js";
import StandardSectionApp from "../StandardSectionApp/index.js";

const StyledTable = styled.table`
  width: 100%;
  border: none;
  margin-bottom: 25px;
`;

const StyledTr = styled.tr`
  border: none;
  &:nth-child(odd) {
    background-color: rgb(211, 245, 197);
  }
  &:nth-child(even) {
    background-color: #d9f5f3;
  }
`;

const StyledTd = styled.td`
  padding: 1px;
`;

export default function PriceInfo() {
  return (
    <>
      <StandardSectionApp sectionTitle="Lease Time & Price">
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>1 hour</StyledTd>
              <StyledTd>$4</StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd>1 day, first day (until 8:00 PM)</StyledTd>
              <StyledTd>$15</StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd>1 day, after the second day on</StyledTd>
              <StyledTd>$10</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
        <StyledLinkAsButton href="/InfoPage">Show more</StyledLinkAsButton>
      </StandardSectionApp>
    </>
  );
}
