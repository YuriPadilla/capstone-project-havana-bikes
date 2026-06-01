import SVGIcon from "../SVGIcon";
import StandardSectionApp from "../StandardSectionApp/index.js";
import useSiteSettings from "@/hooks/useSiteSettings";
import {
  StyledSectionLink,
  StyledTable,
  StyledTr,
  StyledTd,
} from "./ContactInfo.styled";

export default function ContactInfo() {
  const { settings } = useSiteSettings();

  return (
    <>
      <StandardSectionApp sectionTitle="Contact Information">
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd colSpan="2">
                <SVGIcon variant="location" width="15px" />
                {settings.address}
              </StyledTd>
            </StyledTr>
            <StyledTr>
              <StyledTd colSpan="2">
                <SVGIcon variant="info" width="15px" />
                {settings.openingHours}
              </StyledTd>
            </StyledTr>
            {(settings.phone || settings.whatsapp) && (
              <StyledTr>
                {settings.phone && (
                  <StyledTd>
                    <SVGIcon variant="mobile" width="15px" /> {settings.phone}
                  </StyledTd>
                )}
                {settings.whatsapp && (
                  <StyledTd>
                    <SVGIcon variant="landline" width="15px" />{" "}
                    {settings.whatsapp}
                  </StyledTd>
                )}
              </StyledTr>
            )}
            {settings.email && (
              <StyledTr>
                <StyledTd colSpan="2">
                  <SVGIcon variant="email" width="15px" /> {settings.email}
                </StyledTd>
              </StyledTr>
            )}
          </tbody>
        </StyledTable>
        <StyledSectionLink href="/ContactUsPage">
          Send a message
        </StyledSectionLink>
      </StandardSectionApp>
    </>
  );
}
