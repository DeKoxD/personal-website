import styled from "styled-components";
import Frame from "../Frame";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled(Frame)`
  max-width: 700px;
  width: 100%;
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 5px;
`;

export const Header = styled(Frame)`
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

export const AltLetters = styled.span`
  font-size: 25px;
  font-weight: 200;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  @media (max-width: 600px) {
    height: 100%;
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
  }
`;

export const Footer = styled(Frame)`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
