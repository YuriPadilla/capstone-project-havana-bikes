import { calculateRentalPrice } from "@/utils/calculateRentalPrice";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: var(--space-m);
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: space-between;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 0.45rem;
`;

const StyledOutput = styled.output`
  min-height: 2.5rem;
  width: 100%;
  border: 1px solid rgb(83, 82, 82);
  color: green;
  padding: 0.55rem 0.75rem;
`;

export default function PriceCalculatorForm({
  handleChangePrices,
  amountBikes,
  amountDays,
}) {
  return (
    <>
      <StyledForm onChange={handleChangePrices}>
        <StyledWrapper>
          <label htmlFor="amountBikes">Amount bikes:</label>
          <StyledInput
            type="number"
            id="amountBikes"
            name="amountBikes"
            min="1"
          />
        </StyledWrapper>
        <StyledWrapper>
          <label htmlFor="amountDays">Amount days:</label>
          <StyledInput
            type="number"
            id="amountDays"
            name="amountDays"
            min="1"
          />
        </StyledWrapper>
        <StyledWrapper>
          <label htmlFor="price">Estimated rental price:</label>
          <StyledOutput id="price">
            {amountBikes >= 1 && amountDays >= 1 ? (
              <strong>${calculateRentalPrice(amountBikes, amountDays)}</strong>
            ) : (
              "???"
            )}
          </StyledOutput>
        </StyledWrapper>
      </StyledForm>
    </>
  );
}
