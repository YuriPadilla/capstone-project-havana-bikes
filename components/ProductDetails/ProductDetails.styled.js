import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const StyledUlDetails = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const StyledWrapper = styled.div`
  position: relative;
`;

export const StyledImage = styled(Image)`
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
`;

export const StyledPreviousLink = styled(Link)`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 3px 8px #272727;
  border: 1px solid transparent;
  background-color: transparent;
  position: absolute;
  bottom: 50%;
  left: -17px;
  transition: border 1s, background-color 1s;
  &:active {
    border: 1px solid black;
    background-color: #c8f5f0;
  }
`;

export const StyledPreviousWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: transparent;
  position: absolute;
  bottom: 50%;
  left: -17px;
  transition: border 1s, background-color 1s;
`;

export const StyledNextLink = styled(Link)`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 3px 8px #272727;
  border: 1px solid transparent;
  background-color: transparent;
  position: absolute;
  bottom: 50%;
  right: -17px;
  transition: border 1s, background-color 1s;
  &:active {
    border: 1px solid black;
    background-color: #c8f5f0;
  }
`;

export const StyledNextWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: transparent;
  position: absolute;
  bottom: 50%;
  right: -17px;
  transition: border 1s, background-color 1s;
`;
