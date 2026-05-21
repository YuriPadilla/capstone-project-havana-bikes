import styled from "styled-components";
import Image from "next/image";

export const StyledSelectionUl = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-s);
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: min(60vh, 32rem);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledProductLi = styled.li`
  width: 100%;
  border: 1px solid rgb(205, 211, 205);
  border-radius: var(--radius-s);
  overflow: hidden;
`;

export const StyledProductDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(5rem, 7.5rem) minmax(0, 1fr) 2.75rem;
  align-items: center;
  gap: var(--space-s);
  padding: var(--space-s);
  width: 100%;
  background-color: #dfecf887;

  @media (min-width: 768px) {
    grid-template-columns: minmax(7.5rem, 10rem) minmax(0, 1fr) 2.75rem;
  }
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
`;

export const StyledDescriptionUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-wrap: anywhere;
`;

export const StyledRemoveButton = styled.button`
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid transparent;
  border-radius: 50%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;
