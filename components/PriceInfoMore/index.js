import PriceCalculatorForm from "../PriceCalculatorForm";
import { useState } from "react";
import useSWR from "swr";
import StandardSectionApp from "../StandardSectionApp";
import { StyledTable, StyledTr, StyledTd } from "./PriceInfoMore.styled.js";

async function fetchSiteSettings(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Site settings could not be loaded.");
  }

  return response.json();
}

export default function PriceInfoMore() {
  const fallbackSettings = {
    currency: "$",
    hourlyPrice: 4,
    firstDayPrice: 15,
    additionalDayPrice: 10,
    depositAmount: 50,
    openingHours: "Monday - Sunday, 8:00 AM - 8:00 PM",
    depositInfo:
      "The deposit is returned at the end of the rental when the bike is returned in good condition.",
    pickupReturnInfo:
      "Pickup and return details will be coordinated after your booking request is reviewed.",
  };

  const { data, error } = useSWR("/api/site-settings", fetchSiteSettings);
  const siteSettings = data?.settings || data || {};
  const isLoadingSettings = !data && !error;
  const settings = {
    ...fallbackSettings,
    ...siteSettings,
    pickupReturnInfo:
      siteSettings.pickupReturnInfo ||
      siteSettings.pickupInfo ||
      fallbackSettings.pickupReturnInfo,
  };

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
