import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    list-style: none;
    list-style-type: none;
    font-family: "Source Code Pro", serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  html, body {
    background-color: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.secondaryColor};
    height: 100%;
  }

  a {
    &:link, &:visited, &:hover, &:active {
      color: ${(props) => props.theme.secondaryColor};
      text-decoration: underline;
    }

    &:hover {
      font-weight: 900;
    }

    &:active {
      background-color: ${(props) => props.theme.secondaryColor};
      color: ${(props) => props.theme.primaryColor};
      font-weight: 900;
    }
  }

  input {
    all: unset;
  }
`;
