import { styled } from "@linaria/react";

const Button = styled.button`
  all: unset;
  pointer-events: all;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  font-weight: 600;
  :focus {
    outline: revert;
  }
  &:hover {
    font-weight: 900;
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }
  &[aria-checked="true"] {
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }
  &:active {
    border: 2px solid var(--primary-color);
  }
  &:focus-visible {
    border: 2px dashed var(--secondary-color);
    &:hover,
    &[aria-checked="true"] {
      border: 2px dashed var(--primary-color);
    }
  }
`;

export default Button;
