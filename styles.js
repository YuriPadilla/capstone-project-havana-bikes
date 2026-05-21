import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-page-background: rgb(231, 231, 228);
    --color-surface: rgb(254, 254, 254);
    --color-primary: #213327;
    --color-header: #323d47;
    --color-muted: #acacac;
    --color-success: rgb(81, 229, 106);
    --color-highlight: rgb(222, 245, 234);
    --space-xs: 0.25rem;
    --space-s: 0.5rem;
    --space-m: 1rem;
    --space-l: 1.25rem;
    --radius-s: 4px;
    --radius-m: 8px;
    --shadow-s: 0 2px 8px rgba(0, 0, 0, 0.12);
    --layout-mobile-max: 480px;
    --layout-tablet-max: 768px;
    --layout-content-max: 1024px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body,
  #__next {
    min-height: 100%;
  }

  html {
    overflow-x: hidden;
  }

  body {
    margin: 0;
    font-family: Cambria, times;
    background-color: var(--color-page-background);
    color: var(--color-primary);
    overflow-x: hidden;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button,
  input,
  textarea,
  select {
    min-height: 2.5rem;
  }

  input,
  textarea,
  select {
    max-width: 100%;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  img,
  svg {
    max-width: 100%;
  }
`;
