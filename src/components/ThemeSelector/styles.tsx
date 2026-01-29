import Button from "@/components/Button";
import { styled } from "@linaria/react";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const ButtonGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
`;

export const ThemeButton = styled(Button)`
  font-size: 30px;
  width: 30px;
  height: 30px;
`;

export const CustomColorSelector = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

export const InputLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ColorPicker = styled.input`
  border: 1px solid var(--secondary-color);
  height: 20px;
  width: 20px;
  &:hover {
    font-weight: 900;
    background-color: var(--secondary-color);
    color: var(--primary-color);
  }
`;
