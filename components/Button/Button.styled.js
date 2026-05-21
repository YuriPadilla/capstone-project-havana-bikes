import styled, { css } from "styled-components";
import Link from "next/link";

export const StyledButton = styled.button`
  text-decoration: none;
  border: 1px solid #acacac;
  border-radius: 8px;
  color: #acacac;
  font-size: inherit;
  font-family: inherit;
  min-height: 2.75rem;
  padding: 0.55rem 0.9rem;
  background: transparent;
  touch-action: manipulation;

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }

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

export const StyledLinkAsButton = styled(Link)`
  text-decoration: none;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  color: black;
  font-size: inherit;
  font-family: inherit;
  min-height: 2.75rem;
  padding: 0.55rem 0.9rem;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;

  position: absolute;
  bottom: 10px;
  right: 20px;

  &:focus-visible {
    outline: 3px solid #5cafa5;
    outline-offset: 2px;
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;
