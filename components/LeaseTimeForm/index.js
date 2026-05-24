import { calculateRentalPrice } from "@/utils/calculateRentalPrice";
import {
  StyledForm,
  StyledFieldset,
  StyledInputContainer,
  StyledOutput,
  StyledDescriptionUl,
  StyledWrapper,
} from "./LeaseTimeForm.styled.js";
import styled from "styled-components";
import { StyledButton } from "../Button/Button.styled";

const StyledSection = styled.section`
  background-color: var(--color-surface);
  padding: var(--space-l);
  position: relative;
  width: 100%;
`;

const StyledBookingNote = styled.p`
  margin: 0;
`;

export default function LeaseTimeForm({
  handleChange,
  onSubmit,
  howManyBikes,
  fromDate,
  untilDate,
  customerInfo,
  isSubmitting,
}) {
  const initialDate = new Date(fromDate).getTime();
  const finalDate = new Date(untilDate).getTime();

  const leaseDays = () => {
    if (finalDate >= initialDate) {
      return Math.round((finalDate - initialDate) / (24 * 60 * 60 * 1000)) + 1;
    }
  };

  const hasValidDates = finalDate >= initialDate;
  const hasSelectedBikes = howManyBikes >= 1;
  const hasRequiredCustomerInfo =
    customerInfo.name.trim() !== "" && customerInfo.email.trim() !== "";
  const isBookingDisabled =
    !hasSelectedBikes ||
    !hasValidDates ||
    !hasRequiredCustomerInfo ||
    isSubmitting;

  return (
    <StyledSection>
      <StyledForm onSubmit={onSubmit}>
        <StyledFieldset>
          <StyledInputContainer>
            <label htmlFor="name">*Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor="email">*Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor="phone">Phone / WhatsApp:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={handleChange}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor="from">*From:</label>
            <input
              type="date"
              id="from"
              name="from"
              value={fromDate}
              onChange={handleChange}
              required
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <label htmlFor="until">*Until:</label>
            <input
              type="date"
              id="until"
              name="until"
              value={untilDate}
              onChange={handleChange}
              required
            />
          </StyledInputContainer>
        </StyledFieldset>
        <StyledWrapper>
          <StyledOutput>
            {hasValidDates && hasSelectedBikes ? (
              <StyledDescriptionUl>
                <li>
                  <strong>Selected bikes:</strong> {howManyBikes} bike
                  {howManyBikes > 1 && "s"}
                </li>
                <li>
                  <strong>Lease time:</strong> {leaseDays()} day
                  {leaseDays() > 1 && "s"}
                </li>
                <li>
                  <strong>Estimated rental price:</strong> $
                  {calculateRentalPrice(howManyBikes, leaseDays())}
                </li>
                <li>
                  Security deposit: $50 per bike, returned at the end of the
                  rental.
                </li>
              </StyledDescriptionUl>
            ) : (
              <p>
                Select{" "}
                {(isNaN(initialDate) && "days") ||
                  (isNaN(finalDate) && "days") ||
                  (finalDate < initialDate && "days correctly")}{" "}
                {(isNaN(initialDate) && howManyBikes === 0 && "and") ||
                  (isNaN(finalDate) && howManyBikes === 0 && "and") ||
                  (finalDate < initialDate && howManyBikes === 0 && "and")}{" "}
                {howManyBikes === 0 && "bikes"}
              </p>
            )}
          </StyledOutput>
          <StyledBookingNote>
            This is a booking request. We will review bike availability and
            contact you to confirm your reservation.
          </StyledBookingNote>
          <StyledButton
            type="submit"
            disabled={isBookingDisabled}
          >
            {isSubmitting ? "Booking..." : "Send booking request"}
          </StyledButton>
        </StyledWrapper>
      </StyledForm>
    </StyledSection>
  );
}
