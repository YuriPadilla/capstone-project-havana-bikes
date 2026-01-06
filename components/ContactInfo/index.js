import { StyledLinkAsButton } from "../Button/Button.styled.js";
import SVGIcon from "../SVGIcon";
import StandardSectionApp from "../StandardSectionApp/index.js";
import { StyledTable, StyledTr, StyledTd } from "./ContactInfo.styled";

export default function ContactInfo() {
  return (
    <>
      <StandardSectionApp sectionTitle="Contact Information" sectionHeight={33}>
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd colSpan="2">
                <SVGIcon variant="location" width="15px" />
                61 Consulado St. Centro Habana
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd>
                <SVGIcon variant="mobile" width="15px" /> (+53) 5 391 2608
              </StyledTd>
              <StyledTd>
                <SVGIcon variant="landline" width="15px" /> (+53) 7 867 6782
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd colSpan="2">
                <SVGIcon variant="email" width="15px" />{" "}
                yuripadilla017@gmail.com
              </StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
        <StyledLinkAsButton href="/ContactUsPage">
          Send a message
        </StyledLinkAsButton>
      </StandardSectionApp>
    </>
  );
}
