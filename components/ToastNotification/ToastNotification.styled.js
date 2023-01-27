import styled, { css } from "styled-components";

export const StyledToast = styled.div`
  position: absolute;
  top: 80px;
  right: 25px;
  padding: 1rem 2rem;
  border: none;
  font-size: 0.8rem;
  background: rgb(81, 229, 106);
  color: rgb(0 0 0 / 0.8);
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.12) 3px 5px 5px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  ${({ action }) => {
    if (action === "") {
      return css`
        transform: translateX(150%);
      `;
    } else if (action === "enter") {
      return css`
        transform: translateX(0);
        transition: transform 1s cubic-bezier(0, 0.79, 1, 1.02);
      `;
    } else if (action === "exit") {
      return css`
        transform: translateX(150%);
        transition: transform 1s cubic-bezier(0, -0.03, 1, 0.41);
      `;
    }
  }}
`;
