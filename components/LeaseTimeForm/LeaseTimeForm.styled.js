import styled, { css } from "styled-components";

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

export const StyledButton = styled.button`
  text-decoration: none;
  border: 1px solid #acacac;
  border-radius: 8px;
  color: #acacac;
  font-size: inherit;
  font-family: inherit;
  margin: 0 15px;
  padding: 4px 12px;
  background: transparent;
  ${({ disabled }) => {
    if (disabled === false) {
      return css`
        border: 1px solid rgb(205, 211, 205);
        box-shadow: 3px 3px 8px rgb(95, 117, 129);
        background: rgb(222, 245, 234);
        color: black;
      `;
    }
  }}
`;
