import StandardSectionApp from "../StandardSectionApp/index.js";
import {
  StyledSectionLink,
  StyledTable,
  StyledTr,
  StyledTd,
} from "./PriceInfo.styled.js";

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
              <StyledTd>First rental day</StyledTd>
              <StyledTd>$15</StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd>Additional days</StyledTd>
              <StyledTd>$10</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
        <StyledSectionLink href="/InfoPage">
          See full rental details
        </StyledSectionLink>
      </StandardSectionApp>
    </>
  );
}
