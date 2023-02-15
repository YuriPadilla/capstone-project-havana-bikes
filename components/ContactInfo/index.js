//import { StyledLinkAsButton } from "../Button/Button.styled";

import styled from "styled-components";
import Link from "next/link";
import SVGIcon from "../SVGIcon";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 20px;
  position: relative;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

const StyledLinkAsButton = styled(Link)`
  text-decoration: none;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  color: black;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
  position: absolute;
  bottom: 10px;
  right: 20px;
`;

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
      <StyledSection>
        <StyledHeadingH3>Contact information</StyledHeadingH3>
        <hr />
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
      </StyledSection>
    </>
  );
}
