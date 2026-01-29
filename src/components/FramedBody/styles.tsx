import { FramedDiv } from "@/style/framedComponents";
import { styled } from "@linaria/react";
import Button from "../Button";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface ContentProps {
  fullWidth?: boolean;
}

export const Content = styled(FramedDiv)<ContentProps>`
  position: fixed;
  max-width: ${(props) => (props.fullWidth ? "100%" : "1000px")};
  width: 100%;
  min-height: 100dvh;
  height: 100dvh;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  border: 5px solid var(--secondary-color);
  padding: 5px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 25px;
  font-weight: 700;
`;

export const HiddenLetters = styled.span`
  @media (max-width: 300px) {
    display: none;
  }
`;

export const AltLetters = styled.span`
  font-size: 25px;
  font-weight: 200;
`;

export const Footer = styled.footer`
  border: 5px solid var(--secondary-color);
  padding: 5px;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;

export const Main = styled.main`
  overflow: auto;
  height: 100%;
  width: 100%;
`;

export const OptionButton = styled(Button)`
  font-size: 30px;
  width: 30px;
  height: 30px;
`;

export const MiddleSection = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  overflow: hidden;
`;
