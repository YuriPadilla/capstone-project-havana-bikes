import styled from "styled-components";
import Link from "next/link";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 20px;
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const StyledHeadingH2 = styled.h2`
  margin: 0;
  padding: 0;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

const StyledTable = styled.table`
  width: 100%;
  border: none;
  margin-bottom: 20px;
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
  padding: 5px;
`;

const StyledLinkAsButton = styled(Link)`
  text-decoration: none;
  border: 1px solid black;
  border-radius: 8px;
  color: black;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
  background: rgb(216, 216, 204);
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
  position: absolute;
  bottom: 0;
  right: 0;
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
        <StyledHeadingH3>Hours</StyledHeadingH3>
        <hr />
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>Monday - Sunday</StyledTd>
              <StyledTd>8:00 AM - 8:00 PM</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
        <StyledLinkAsButton href="/InfoPage">Show more</StyledLinkAsButton>
      </StyledSection>
    </>
  );
}
