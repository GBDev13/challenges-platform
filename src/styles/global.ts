import { rgba } from "polished";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => rgba(theme.primary, 0.2)}
    }
  }

  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text}
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none
  }
`;
