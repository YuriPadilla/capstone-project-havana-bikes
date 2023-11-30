import styled from "styled-components";

export const StyledPreviewSection = styled.section`
  background-color: rgb(254, 254, 254);
  position: relative;
  width: 100%;
  height: 34%;
`;

export const StyledBikesPreviewUl = styled.ul`
  list-style-type: none;
  display: flex;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0;
  margin-top: 0;
  margin-bottom: 45px;
`;

export const StyledBikePreviewLi = styled.li`
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgb(95, 117, 129);
  margin: 3px;
  padding 2px;
`;

export const StyledWrapperHeading = styled.div`
  padding: 1.25rem 1.25rem 0 1.25rem;
  width: 100%;
`;

export const StyledHeadingH3 = styled.h3`
  margin: 0;
  padding: 0;
`;
