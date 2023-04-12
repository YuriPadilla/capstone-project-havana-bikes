import styled from "styled-components";
import { StyledLinkAsButton } from "../Button/Button.styled.js";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 20px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

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
      <StyledSection>
        <StyledHeadingH3>Lease Time & Price</StyledHeadingH3>
        <hr />
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
      </StyledSection>
    </>
  );
}
