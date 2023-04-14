import { StyledLinkAsButton } from "../Button/Button.styled.js";
import styled from "styled-components";
import SVGIcon from "../SVGIcon";
import StandardSectionApp from "../StandardSectionApp/index.js";

const StyledTable = styled.table`
  width: 100%;
  border: none;
  margin-bottom: 25px;
`;

const StyledTr = styled.tr`
  border: none;
  &:nth-child(odd) {
    background-color: #d9f5f3;
  }
  &:nth-child(even) {
    background-color: rgb(211, 245, 197);
  }
`;

const StyledTd = styled.td`
  vertical-align: center;
`;

export default function ContactInfo() {
  return (
    <>
      <StandardSectionApp sectionTitle="Contact Information">
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
