import { StyledLinkAsButton } from "../Button/Button.styled.js";
import StandardSectionApp from "../StandardSectionApp/index.js";
import { StyledTable, StyledTr, StyledTd } from "./PriceInfo.styled.js";

export default function PriceInfo() {
  return (
    <>
      <StandardSectionApp sectionTitle="Lease Time & Price" sectionHeight={33}>
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
