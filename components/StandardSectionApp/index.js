import styled from "styled-components";

const StyledSection = styled.section`
  background-color: var(--color-surface);
  padding: var(--space-l);
  position: relative;
  width: 100%;
  min-height: ${({ sectionHeight }) =>
    sectionHeight ? `${sectionHeight}vh` : "auto"};
  overflow-wrap: break-word;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

export default function StandardSectionApp({
  sectionTitle,
  sectionHeight,
  children,
}) {
  return (
    <StyledSection sectionHeight={sectionHeight}>
      <StyledHeadingH3>{sectionTitle}</StyledHeadingH3>
      <hr />
      {children}
    </StyledSection>
  );
}
