import { styled } from "@linaria/react";
import Button from "../Button";

export const List = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  padding-top: 10px;
  gap: 5px;
`;

export const Item = styled.div`
  background-color: var(--primary-color);
  border: 3px solid var(--secondary-color);
  padding: 5px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  user-select: none;
`;

export const ClearButton = styled(Button)`
  padding: 5px;
  height: 15px;
  width: 15px;
  font-size: 15px;
`;
