import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.35rem;
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
`;
// font-family: Arial, Helvetica, sans-serif;
// font-size: 79%;

const StyledOutput = styled.output`
  width: 100%;
  border: 1px solid rgb(83, 82, 82);
  color: green;
  padding: 0 0 0 1em;
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
          <label htmlFor="price">Price:</label>
          <StyledOutput id="price">
            {amountBikes >= 1 && amountDays >= 1 ? (
              <strong>${(amountDays * 10 + 5) * amountBikes}</strong>
            ) : (
              "???"
            )}
          </StyledOutput>
        </StyledWrapper>
      </StyledForm>
    </>
  );
}
