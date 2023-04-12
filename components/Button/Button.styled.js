import styled, { css } from "styled-components";
import Link from "next/link";

// export const StyledButton = styled.button`
//   text-decoration: none;
//   border: 1px solid black;
//   border-radius: 8px;
//   color: black;
//   font-size: inherit;
//   font-family: inherit;
//   padding: 3px 7px;
//   background: rgb(216, 216, 204);
//   box-shadow: 0px 0px 8px rgb(95, 117, 129);
// `;

export const StyledButton = styled.button`
  text-decoration: none;
  border: 1px solid #acacac;
  border-radius: 8px;
  color: #acacac;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
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

// export const StyledLinkAsButton = styled(Link)`
//   text-decoration: none;
//   border: 1px solid black;
//   border-radius: 8px;
//   color: black;
//   font-size: inherit;
//   font-family: inherit;
//   padding: 3px 7px;
//   background: rgb(216, 216, 204);
//   box-shadow: 0px 0px 8px rgb(95, 117, 129);
// `;

export const StyledLinkAsButton = styled(Link)`
  text-decoration: none;
  border: 1px solid rgb(205, 211, 205);
  border-radius: 8px;
  color: black;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
  background: rgb(222, 245, 234);
  box-shadow: 3px 3px 8px rgb(95, 117, 129);

  position: absolute;
  bottom: 10px;
  right: 20px;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;
