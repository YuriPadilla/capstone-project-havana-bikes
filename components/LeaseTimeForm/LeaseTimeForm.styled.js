import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: var(--space-m);
  width: 100%;
`;

export const StyledFieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-self: center;
  gap: var(--space-s);
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: space-between;
  flex: 1 1 100%;
  min-width: 0;
  width: 100%;

  input {
    width: 100%;
    min-width: 0;
    padding: 0.45rem;
  }

  @media (min-width: 480px) {
    flex-basis: calc(50% - var(--space-s));
  }

  @media (min-width: 768px) {
    flex-basis: calc(33.333% - var(--space-s));
  }
`;

export const StyledOutput = styled.output`
  min-height: 3.5rem;
  overflow-wrap: anywhere;
`;

export const StyledDescriptionUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: var(--space-m);

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;
