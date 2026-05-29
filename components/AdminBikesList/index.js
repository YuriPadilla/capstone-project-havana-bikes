import styled from "styled-components";
import AdminBikeCard from "@/components/AdminBikeCard";

const StyledList = styled.ul`
  display: grid;
  gap: var(--space-m);
  margin: var(--space-l) 0 0;
  padding: 0;
  list-style: none;
`;

export default function AdminBikesList({
  bikes,
  onUpdateStatus,
  updatingBikeId,
}) {
  return (
    <StyledList>
      {bikes.map((bike) => (
        <li key={bike._id}>
          <AdminBikeCard
            bike={bike}
            onUpdateStatus={onUpdateStatus}
            isUpdating={updatingBikeId === bike._id}
          />
        </li>
      ))}
    </StyledList>
  );
}
