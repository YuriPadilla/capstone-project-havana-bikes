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

export default function AdminBikeCard({ bike }) {
  const name = bike.name || "Unnamed bike";
  const brand = bike.brand || "No brand";
  const size = bike.size || "No size";
  const type = bike.type || "No type";
  const price =
    bike.pricePerDay || bike.pricePerDay === 0
      ? `$${bike.pricePerDay} per day`
      : "No price set";
  const status = bike.isActive === false ? "Inactive" : "Active";

  return (
    <StyledCard>
      <StyledHeader>
        <StyledTitle>{name}</StyledTitle>
        <StyledStatus>{status}</StyledStatus>
      </StyledHeader>
      <StyledDetailsGrid>
        <StyledSection>
          <StyledSectionTitle>Brand</StyledSectionTitle>
          <StyledText>{brand}</StyledText>
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Size</StyledSectionTitle>
          <StyledText>{size}</StyledText>
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Type</StyledSectionTitle>
          <StyledText>{type}</StyledText>
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Price</StyledSectionTitle>
          <StyledText>{price}</StyledText>
        </StyledSection>
      </StyledDetailsGrid>
    </StyledCard>
  );
}
