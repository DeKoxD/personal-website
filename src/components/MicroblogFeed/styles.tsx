import styled from "styled-components";
import Button from "../Button";
import Frame from "../Frame";

export const PostList = styled(Frame)`
  display: flex;
  flex-direction: column;
  gap: 5px;
  & > *:not(:last-child) {
    border-bottom: 5px solid ${(props) => props.theme.secondaryColor};
  }
`;

export const NavButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 0px;
`;

export const NavButton = styled(Button)`
  height: 20px;
  width: 20px;
`;
