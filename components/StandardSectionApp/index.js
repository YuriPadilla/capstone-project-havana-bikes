import styled from "styled-components";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 1.25rem;
  position: relative;
  width: 100%;
  height: ${({sectionHeight}) => sectionHeight}%;
  overflow: hidden;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

export default function StandardSectionApp({ sectionTitle, sectionHeight, children }) {
  return (
    <StyledSection sectionHeight={sectionHeight}>
      <StyledHeadingH3>{sectionTitle}</StyledHeadingH3>
      <hr />
      {children}
    </StyledSection>
  );
}
