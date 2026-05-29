import Link from "next/link";
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

const StyledActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-s);
`;

const StyledActionButton = styled.button`
  min-height: 2.75rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
  color: black;
  font: inherit;
  touch-action: manipulation;

  &:disabled {
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;

const StyledActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
  color: black;
  font: inherit;
  text-decoration: none;
  touch-action: manipulation;

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;

export default function AdminBikeCard({ bike, onUpdateStatus, isUpdating }) {
  const name = bike.name || "Unnamed bike";
  const brand = bike.brand || "No brand";
  const size = bike.size || "No size";
  const type = bike.type || "No type";
  const price =
    bike.pricePerDay || bike.pricePerDay === 0
      ? `$${bike.pricePerDay} per day`
      : "No price set";
  const isActive = bike.isActive !== false;
  const status = isActive ? "Active" : "Inactive";
  const nextIsActive = !isActive;
  const actionLabel = isActive ? "Deactivate" : "Activate";

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
        <StyledSection>
          <StyledSectionTitle>Actions</StyledSectionTitle>
          <StyledActions>
            <StyledActionLink href={`/admin/bikes/${bike._id}/edit`}>
              Edit
            </StyledActionLink>
            <StyledActionButton
              type="button"
              disabled={isUpdating}
              onClick={() => onUpdateStatus(bike._id, nextIsActive)}
            >
              {isUpdating ? "Updating..." : actionLabel}
            </StyledActionButton>
          </StyledActions>
        </StyledSection>
      </StyledDetailsGrid>
    </StyledCard>
  );
}
