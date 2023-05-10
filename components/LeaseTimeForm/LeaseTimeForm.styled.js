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
  justify-content: space-between;
  align-items: flex-start;
  align-self: center;
  gap: 1rem;
  width: 100%;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: space-between;
  width: 100%;
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
  justify-content: space-between;
  align-items: center;
`;
