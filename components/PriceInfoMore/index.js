import PriceCalculatorForm from "../PriceCalculatorForm";
import { useState } from "react";
import StandardSectionApp from "../StandardSectionApp";
import {
  StyledTable,
  StyledTr,
  StyledTd,
  StyledP,
} from "./PriceInfoMore.styled.js";

export default function PriceInfoMore() {
  const [inputAmountBikesDays, setInputAmountBikesDays] = useState({
    amountBikes: "",
    amountDays: "",
  });

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
      <StandardSectionApp sectionTitle="Lease Time & Price" sectionHeight={30}>
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
      </StandardSectionApp>
      <StandardSectionApp sectionTitle="Price calculator" sectionHeight={24}>
        <PriceCalculatorForm
          handleChangePrices={handleChangePrices}
          amountBikes={inputAmountBikesDays.amountBikes}
          amountDays={inputAmountBikesDays.amountDays}
        />
      </StandardSectionApp>
      <StandardSectionApp sectionTitle="Hours" sectionHeight={21}>
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>Monday - Sunday</StyledTd>
              <StyledTd>8:00 AM - 8:00 PM</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
      </StandardSectionApp>
      <StandardSectionApp sectionTitle="Deposit" sectionHeight={25}>
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>1 bike</StyledTd>
              <StyledTd>$50</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
        <StyledP>The Deposit will be returned at the end.</StyledP>
      </StandardSectionApp>
    </>
  );
}
