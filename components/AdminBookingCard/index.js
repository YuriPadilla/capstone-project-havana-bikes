import styled from "styled-components";

const StyledCard = styled.article`
  display: grid;
  gap: var(--space-m);
  padding: var(--space-m);
  border: 1px solid #d7ddd8;
  border-radius: var(--radius-s);
  background: #ffffff;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-s);
`;

const StyledTitle = styled.h4`
  margin: 0;
`;

const StyledStatus = styled.span`
  font-weight: 700;
`;

const StyledDetailsGrid = styled.div`
  display: grid;
  gap: var(--space-m);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StyledSection = styled.section`
  display: grid;
  gap: 0.25rem;
`;

const StyledSectionTitle = styled.h5`
  margin: 0;
`;

const StyledText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const StyledBikeList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
`;

function formatDate(date) {
  if (!date) {
    return "Not set";
  }

  return new Date(date).toLocaleDateString("en-US");
}

function getBikeName(bike) {
  if (!bike || typeof bike === "string") {
    return "Bike";
  }

  return bike.displayName || bike.name || bike.brand || "Bike";
}

function getBikeSize(bike) {
  if (!bike || typeof bike === "string") {
    return "";
  }

  return bike.size || "";
}

export default function AdminBookingCard({ booking }) {
  const selectedBikes = Array.isArray(booking.selectedBikes)
    ? booking.selectedBikes
    : [];

  return (
    <StyledCard>
      <StyledHeader>
        <StyledTitle>{booking.customerName}</StyledTitle>
        <StyledStatus>{booking.status}</StyledStatus>
      </StyledHeader>
      <StyledDetailsGrid>
        <StyledSection>
          <StyledSectionTitle>Customer</StyledSectionTitle>
          <StyledText>{booking.customerEmail}</StyledText>
          {booking.customerPhone && (
            <StyledText>{booking.customerPhone}</StyledText>
          )}
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Rental dates</StyledSectionTitle>
          <StyledText>
            {formatDate(booking.fromDate)} - {formatDate(booking.untilDate)}
          </StyledText>
          {booking.createdAt && (
            <StyledText>Received: {formatDate(booking.createdAt)}</StyledText>
          )}
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Selected bikes</StyledSectionTitle>
          {selectedBikes.length > 0 ? (
            <StyledBikeList>
              {selectedBikes.map((bike, index) => {
                const bikeSize = getBikeSize(bike);

                return (
                  <li key={bike?._id || bike || index}>
                    {getBikeName(bike)}
                    {bikeSize && `, size ${bikeSize}`}
                  </li>
                );
              })}
            </StyledBikeList>
          ) : (
            <StyledText>No bikes listed.</StyledText>
          )}
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Total price</StyledSectionTitle>
          <StyledText>${booking.totalPrice}</StyledText>
        </StyledSection>
      </StyledDetailsGrid>
    </StyledCard>
  );
}
