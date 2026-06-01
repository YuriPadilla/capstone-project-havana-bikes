import PriceCalculatorForm from "../PriceCalculatorForm";
import { useState } from "react";
import useSiteSettings from "@/hooks/useSiteSettings";
import StandardSectionApp from "../StandardSectionApp";
import { StyledTable, StyledTr, StyledTd } from "./PriceInfoMore.styled.js";

export default function PriceInfoMore() {
  const { settings, isLoading: isLoadingSettings } = useSiteSettings();

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
      <StandardSectionApp sectionTitle="Lease Time & Price">
        {isLoadingSettings && <p>Loading latest rental details...</p>}
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
      </StandardSectionApp>
      <StandardSectionApp sectionTitle="Price calculator">
        <PriceCalculatorForm
          handleChangePrices={handleChangePrices}
          amountBikes={inputAmountBikesDays.amountBikes}
          amountDays={inputAmountBikesDays.amountDays}
          firstDayPrice={settings.firstDayPrice}
          additionalDayPrice={settings.additionalDayPrice}
          currency={settings.currency}
        />
      </StandardSectionApp>
      <StandardSectionApp sectionTitle="Hours">
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>{settings.openingHours}</StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
      </StandardSectionApp>
      <StandardSectionApp sectionTitle="Deposit">
        <StyledTable>
          <tbody>
            <StyledTr>
              <StyledTd>1 bike</StyledTd>
              <StyledTd>
                {settings.currency}
                {settings.depositAmount}
              </StyledTd>
            </StyledTr>
          </tbody>
        </StyledTable>
        <p>{settings.depositInfo}</p>
      </StandardSectionApp>
      <StandardSectionApp sectionTitle="Pickup & Return">
        <p>{settings.pickupReturnInfo}</p>
      </StandardSectionApp>
    </>
  );
}
