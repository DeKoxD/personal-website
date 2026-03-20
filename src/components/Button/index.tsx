import { styled } from "@linaria/react";

const Button = styled.button`
  --stroke-w: 10px;

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

  * {
    fill: var(--secondary-color);
    stroke: var(--secondary-color);
  }

  & > * {
    height: 100%;
  }

  :focus {
    outline: revert;
  }
  @media (hover: hover) {
    &:hover {
      font-weight: 900;
      background-color: var(--secondary-color);
      color: var(--primary-color);
      * {
        fill: var(--primary-color);
        stroke: var(--primary-color);
        stroke-width: calc(var(--stroke-w) * 2);
      }
    }
  }
  &[aria-checked="true"] {
    background-color: var(--secondary-color);
    color: var(--primary-color);
    * {
      fill: var(--primary-color);
      stroke: var(--primary-color);
    }
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
