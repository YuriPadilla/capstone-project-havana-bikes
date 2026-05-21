import styled from "styled-components";

export const StyledMain = styled.main`
  min-height: 100vh;
  width: 100%;
  max-width: var(--layout-content-max);
  margin: 0 auto;
  padding: calc(4.5rem + var(--space-s)) var(--space-s)
    calc(4rem + var(--space-s));
  display: flex;
  flex-direction: column;
  gap: var(--space-s);

  @media (min-width: 768px) {
    padding-left: var(--space-m);
    padding-right: var(--space-m);
  }
`;
