import styled, { WebTarget } from "styled-components";

export type ButtonProps = {
  $active?: boolean;
} & WebTarget;

const Button = styled.button<ButtonProps>`
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
  ${(props) =>
    props.$active && {
      backgroundColor: props.theme.secondaryColor,
      color: props.theme.primaryColor,
    }}
`;

export default Button;
