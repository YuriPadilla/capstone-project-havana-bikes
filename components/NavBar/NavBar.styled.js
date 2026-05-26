import styled from "styled-components";

export const StyledNavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  min-height: 4rem;
  padding: 0.35rem 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.25rem;
  background-color: rgb(238, 245, 235);
  border-top: 1px solid #9a9e9b;
`;

export const StyledNavLink = styled.a`
  min-width: 3rem;
  min-height: 3rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  color: ${({ $active }) => ($active ? "#213327" : "#acacac")};
  text-decoration: none;

  @media (min-width: 768px) {
    min-width: 6rem;
    padding: 0.35rem 0.75rem;
  }
`;

export const StyledNavLabel = styled.span`
  display: none;
  font-size: 0.95rem;
  font-weight: bold;

  @media (min-width: 768px) {
    display: inline;
  }
`;

export const StyledTextIcon = styled.span`
  width: 40px;
  min-width: 40px;
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${({ $active }) => ($active ? "#213327" : "#acacac")};
`;
