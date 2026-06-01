import useSiteSettings from "@/hooks/useSiteSettings";
import StandardSectionApp from "../StandardSectionApp/index.js";
import {
  StyledSectionLink,
  StyledTable,
  StyledTr,
  StyledTd,
} from "./PriceInfo.styled.js";

export default function PriceInfo() {
  const { settings } = useSiteSettings();

  return (
    <>
      <StandardSectionApp sectionTitle="Lease Time & Price">
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>1 hour</StyledTd>
              <StyledTd>
                {settings.currency}
                {settings.hourlyPrice}
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd>First rental day</StyledTd>
              <StyledTd>
                {settings.currency}
                {settings.firstDayPrice}
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd>Additional days</StyledTd>
              <StyledTd>
                {settings.currency}
                {settings.additionalDayPrice}
              </StyledTd>
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
