import styled from "styled-components";
import Link from "next/link";
import PriceCalculatorForm from "../PriceCalculatorForm";
import { useState } from "react";

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
`;
//margin-bottom: 25px;

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

const StyledP = styled.p`
  margin: 17px 0 0 0;
  padding: 0;
`;

export default function PriceInfoMore() {
  const [inputAmountBikesDays, setInputAmountBikesDays] = useState({
    amountBikes: "",
    amountDays: "",
  });
  //const [inputAmountDays, setInputAmountDays] = useState("");

  function handleChangePrices(event) {
    if (event.target.name === "amountBikes") {
      setInputAmountBikesDays({
        ...inputAmountBikesDays,
        amountBikes: event.target.value,
      });
    } else if (event.target.name === "amountDays") {
      setInputAmountBikesDays({
        ...inputAmountBikesDays,
        amountDays: event.target.value,
      });
    }
  }

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
      </StyledSection>
      <StyledSection>
        <StyledHeadingH3>Price calculator</StyledHeadingH3>
        <hr />
        <PriceCalculatorForm
          handleChangePrices={handleChangePrices}
          amountBikes={inputAmountBikesDays.amountBikes}
          amountDays={inputAmountBikesDays.amountDays}
        />
      </StyledSection>
      <StyledSection>
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
      </StyledSection>
      <StyledSection>
        <StyledHeadingH3>Deposit</StyledHeadingH3>
        <hr />
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>1 bike</StyledTd>
              <StyledTd>$50</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
        <StyledP>The Deposit will be returned at the end.</StyledP>
      </StyledSection>
    </>
  );
}
