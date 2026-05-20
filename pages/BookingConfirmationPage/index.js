import { bookingConfirmationAtom } from "@/store/atoms";
import { useAtomValue } from "jotai";
import Link from "next/link";
import styled from "styled-components";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 1.25rem;
  width: 100%;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 720px;
  margin: 0 auto;
`;

const StyledHeading = styled.h2`
  margin-top: 0;
`;

const StyledDetailsSection = styled.section`
  border-top: 1px solid rgb(210, 210, 210);
  padding-top: 1rem;
`;

const StyledSubHeading = styled.h3`
  margin: 0 0 0.5rem;
`;

const StyledBikeList = styled.ul`
  padding-left: 1.25rem;
  margin: 0;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: black;
  font-weight: bold;
`;

export default function BookingConfirmationPage() {
  const bookingConfirmation = useAtomValue(bookingConfirmationAtom);

  if (!bookingConfirmation) {
    return (
      <StyledSection>
        <StyledContent>
          <StyledHeading>No booking details available</StyledHeading>
          <p>Please choose your bikes and send a booking request.</p>
          <StyledLink href="/Bikes">Back to bikes</StyledLink>
        </StyledContent>
      </StyledSection>
    );
  }

  const {
    selectedProducts,
    fromDate,
    untilDate,
    totalPrice,
    customerName,
  } = bookingConfirmation;

  return (
    <StyledSection>
      <StyledContent>
        <div>
          <StyledHeading>Booking request received</StyledHeading>
          <p>
            Thank you{customerName && `, ${customerName}`}. Your bike rental
            request was sent successfully.
          </p>
        </div>
        <StyledDetailsSection>
          <StyledSubHeading>Selected bikes</StyledSubHeading>
          <StyledBikeList>
            {selectedProducts?.map((bike) => {
              return (
                <li key={bike._id}>
                  {bike.brand || "Bike"} {bike.size && `- ${bike.size}`}
                </li>
              );
            })}
          </StyledBikeList>
        </StyledDetailsSection>
        <StyledDetailsSection>
          <StyledSubHeading>Rental dates</StyledSubHeading>
          <p>
            <strong>From:</strong> {fromDate}
          </p>
          <p>
            <strong>Until:</strong> {untilDate}
          </p>
        </StyledDetailsSection>
        <StyledDetailsSection>
          <StyledSubHeading>Total price</StyledSubHeading>
          <p>
            <strong>${totalPrice}</strong>
          </p>
        </StyledDetailsSection>
        <StyledDetailsSection>
          <StyledSubHeading>What happens next</StyledSubHeading>
          <p>
            Your booking is not confirmed yet. Havana Bikes will contact you to
            confirm availability and finalize your reservation.
          </p>
        </StyledDetailsSection>
        <StyledLink href="/Bikes">Back to bikes</StyledLink>
      </StyledContent>
    </StyledSection>
  );
}
