import styled from "styled-components";

const Button = styled.button`
  all: unset;
  :focus {
    outline: revert;
  }
  &:hover {
    font-weight: 900;
    background-color: ${(props) => props.theme.secondaryColor};
    color: ${(props) => props.theme.primaryColor};
  }
  border: 1px solid ${(props) => props.theme.secondaryColor};
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    background-color: ${(props) => props.theme.secondaryColor};
    color: ${(props) => props.theme.primaryColor};
  }
`;

export default Button;
