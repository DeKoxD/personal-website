import { styled } from "@linaria/react";
import { FramedDiv } from "../../style/framedComponents";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled(FramedDiv)`
  max-width: 1000px;
  width: 100%;
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 5px;
`;

export const Header = styled.header`
  border: 5px solid var(--secondary-color);
  padding: 5px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
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
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;

export const Main = styled.main``;
