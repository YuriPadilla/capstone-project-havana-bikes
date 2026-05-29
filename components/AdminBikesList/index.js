import styled from "styled-components";
import AdminBikeCard from "@/components/AdminBikeCard";

const StyledList = styled.ul`
  display: grid;
  gap: var(--space-m);
  margin: var(--space-l) 0 0;
  padding: 0;
  list-style: none;
`;

export default function AdminBikesList({ bikes }) {
  return (
    <StyledList>
      {bikes.map((bike) => (
        <li key={bike._id}>
          <AdminBikeCard bike={bike} />
        </li>
      ))}
    </StyledList>
  );
}
