import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  min-height: 4.5rem;
  margin: 0;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background-color: #323d47;
  color: #5cafa5;
`;

export const StyledHeading = styled.h1`
  font-family: FugazOne-Regular;
  font-size: clamp(1rem, 5vw, 1.4rem);
  line-height: 1.1;
  margin: 0;
  min-width: 0;
  overflow-wrap: break-word;
`;
