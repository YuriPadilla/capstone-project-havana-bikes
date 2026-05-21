import styled from "styled-components";
import { StyledLinkAsButton } from "../Button/Button.styled";

export const StyledPreviewSection = styled.section`
  background-color: var(--color-surface);
  position: relative;
  width: 100%;
  padding: var(--space-l);
`;

export const StyledBikesPreviewUl = styled.ul`
  list-style-type: none;
  display: flex;
  gap: var(--space-s);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0;
  margin: 0 0 var(--space-m);

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    overflow: visible;
  }
`;

export const StyledBikePreviewLi = styled.li`
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgb(95, 117, 129);
  padding: 0.25rem;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
`;

export const StyledWrapperHeading = styled.div`
  width: 100%;
`;

export const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

export const StyledSectionLink = styled(StyledLinkAsButton)`
  position: static;
`;
