import styled, { css } from "styled-components";

export const StyledForm = styled.form`
  margin: 10px;
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
  width: 100%;
  height: 60px;
`;

export const StyledDescriptionUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const StyledButton = styled.button`
  text-decoration: none;
  border: 1px solid #acacac;
  border-radius: 8px;
  color: #acacac;
  font-size: inherit;
  font-family: inherit;
  margin: 0 8px;
  padding: 4px 12px;
  transition: border 1s, box-shadow 1s, background 1s, color 1s;
  ${({ disabled }) => {
    if (disabled === false) {
      return css`
        border: 1px solid black;
        box-shadow: 1px 3px 12px rgb(95, 117, 129);
        background: rgb(216, 216, 204);
        color: black;
      `;
    }
  }}
`;
