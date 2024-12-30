import styled from "styled-components";
import Button from "../Button";

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
  font-size: 20px;
  width: 20px;
  height: 20px;
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
  height: 30px;
  width: 30px;
`;
