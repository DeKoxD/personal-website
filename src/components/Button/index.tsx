import { styled } from "@linaria/react";

export type ButtonProps = {
  $active?: boolean;
};

const Button = styled.button<ButtonProps>`
  all: unset;
  pointer-events: all;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  :focus {
    outline: revert;
  }
  &:hover {
    font-weight: 900;
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }
  background-color: var(
    --${(props) => (props.$active ? "primary-color" : "secondary-color")}
  );
  color: var(
    --${(props) => (props.$active ? "secondary-color" : "primary-color")}
  );
`;

export default Button;
