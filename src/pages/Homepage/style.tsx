import styled from "styled-components";
import Frame from "../../components/Frame";

export const Header = styled(Frame)`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span`
  font-size: 25px;
`;

export const Main = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Section = styled(Frame)`
  display: flex;
  flex-direction: column;
`;

export const Footer = styled(Frame)`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
