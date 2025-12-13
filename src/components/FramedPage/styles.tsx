import styled from "styled-components";
import { Link } from "wouter";
import Frame from "../Frame";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled(Frame)`
  max-width: 1000px;
  width: 100%;
  min-height: 100dvh;
  display: grid;
  grid-template-columns: 100%;
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

export const Title = styled(Link)`
  text-decoration: none !important;
  font-size: 25px;
  font-weight: 700;
`;

export const AltLetters = styled.span`
  font-size: 25px;
  font-weight: 200;
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
`;

export const Footer = styled(Frame)`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
