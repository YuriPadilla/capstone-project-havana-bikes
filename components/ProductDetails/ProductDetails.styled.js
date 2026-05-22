import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export const StyledUlDetails = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: var(--space-m) 0 0;
`;

export const StyledProductName = styled.h3`
  margin: var(--space-m) 0 0;
`;

export const StyledDescription = styled.p`
  margin: var(--space-s) 0 0;
  overflow-wrap: anywhere;
`;

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 2.75rem minmax(0, 1fr) 2.75rem;
  align-items: center;
  gap: var(--space-s);
  width: 100%;
`;

export const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  max-width: 33rem;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
  justify-self: center;
`;

export const StyledPreviousLink = styled(Link)`
  min-width: 2.75rem;
  min-height: 2.75rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 3px 8px #272727;
  border: 1px solid transparent;
  background-color: transparent;
  transition: border 1s, background-color 1s;
  &:active {
    border: 1px solid black;
    background-color: #c8f5f0;
  }
`;

export const StyledPreviousWrapper = styled.div`
  min-width: 2.75rem;
  min-height: 2.75rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: transparent;
  transition: border 1s, background-color 1s;
`;

export const StyledNextLink = styled(Link)`
  min-width: 2.75rem;
  min-height: 2.75rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 3px 8px #272727;
  border: 1px solid transparent;
  background-color: transparent;
  transition: border 1s, background-color 1s;
  &:active {
    border: 1px solid black;
    background-color: #c8f5f0;
  }
`;

export const StyledNextWrapper = styled.div`
  min-width: 2.75rem;
  min-height: 2.75rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: transparent;
  transition: border 1s, background-color 1s;
`;

export const StyledButtonCartWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: var(--space-m) 0 0;
  margin: 0;
`;

export const StyledButtonBackWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: var(--space-m) 0 0;
  margin: 0;
`;

export const StyledLinkAsButton = styled(Link)`
  border: 1px solid rgb(205, 211, 205);
  border-radius: 50%;
  min-width: 2.75rem;
  min-height: 2.75rem;
  padding: 0.4rem;
  background: rgb(222, 245, 234);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 8px rgb(95, 117, 129);
`;
