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

    &[target="_blank"]::after {
      width: 0.6rem;
      height: 0.6rem;
      margin-left: 0.2rem;
      margin-right: 0.1rem;
      background-color: ${(props) => props.theme.secondaryColor};
      display: inline-block;
      content: "";
      mask: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==) no-repeat 50% 50%;
      //mask: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgOCA4Ij48cGF0aCBkPSJNMCAwdjhoOHYtMmgtMXYxaC02di02aDF2LTFoLTJ6bTQgMGwxLjUgMS41LTIuNSAyLjUgMSAxIDIuNS0yLjUgMS41IDEuNXYtNGgtNHoiLz48L3N2Zz4=) no-repeat 50% 50%;
      mask-size: cover;
    }

    &[target="_blank"]:active::after {
      background-color: ${(props) => props.theme.primaryColor};
    }
  }

  input {
    all: unset;
  }

  ::selection {
    background-color: ${(props) => props.theme.secondaryColor};
    color: ${(props) => props.theme.primaryColor};
  }
`;
