import styled from "styled-components";

export const StyledBikesUl = styled.ul`
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
  gap: var(--space-m);
  margin: 0;
  padding: 0;
`;

export const StyledBikeLi = styled.li`
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgb(95, 117, 129);
  padding: var(--space-s);
  background-color: var(--color-surface);
`;

export const StyledBikeLink = styled.a`
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-s);
  color: inherit;
  text-decoration: none;

  img {
    width: 100%;
    height: auto;
  }
`;

export const StyledBikeName = styled.h4`
  margin: 0;
  text-align: center;
`;

export const StyledBikeInfo = styled.p`
  margin: 0;
  text-align: center;
`;
