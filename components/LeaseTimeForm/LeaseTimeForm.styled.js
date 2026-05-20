import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

export const StyledFieldset = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-self: center;
  gap: 0.75rem;
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
  }

  @media (min-width: 480px) {
    flex-basis: calc(50% - 0.75rem);
  }

  @media (min-width: 768px) {
    flex-basis: calc(33.333% - 0.75rem);
  }
`;

export const StyledOutput = styled.output`
  height: 56px;
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
  gap: 0.75rem;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
