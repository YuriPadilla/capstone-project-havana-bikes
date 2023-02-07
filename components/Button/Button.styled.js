import styled from "styled-components";
import Link from "next/link";

export const StyledButton = styled.button`
  text-decoration: none;
  border: 1px solid black;
  border-radius: 8px;
  color: black;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
  background: rgb(216, 216, 204);
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
`;

export const StyledLinkAsButton = styled(Link)`
  text-decoration: none;
  border: 1px solid black;
  border-radius: 8px;
  color: black;
  font-size: inherit;
  font-family: inherit;
  padding: 3px 7px;
  background: rgb(216, 216, 204);
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px;
`;
