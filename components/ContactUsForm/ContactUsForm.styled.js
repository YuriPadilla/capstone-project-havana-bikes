import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: var(--space-m);
  width: 100%;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: space-between;
  width: 100%;

  input,
  textarea {
    width: 100%;
    min-width: 0;
    padding: 0.45rem;
  }

  textarea {
    resize: vertical;
  }
`;

export const StyledOutput = styled.output`
  align-self: flex-end;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 79%;
  color: rgb(111, 111, 111);
`;

export const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: var(--space-m);
`;
