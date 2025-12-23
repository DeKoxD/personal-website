import { styled } from "@linaria/react";
import { FramedSection } from "../../style/framedComponents";

export const Content = styled.div`
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

export const Section = styled(FramedSection)`
  display: flex;
  flex-direction: column;
`;

export const InfoLabel = styled.span`
  font-weight: 600;

  &::after {
    content: ":";
    margin-right: 0.2rem;
  }
`;

export const InfoValue = styled.span``;
