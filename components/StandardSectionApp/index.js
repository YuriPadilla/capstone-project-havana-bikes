import styled from "styled-components";

const StyledSection = styled.section`
  background-color: rgb(254, 254, 254);
  padding: 20px;
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;

export default function StandardSectionApp({ sectionTitle, children }) {
  return (
    <StyledSection>
      <StyledHeadingH3>{sectionTitle}</StyledHeadingH3>
      <hr />
      {children}
    </StyledSection>
  );
}
