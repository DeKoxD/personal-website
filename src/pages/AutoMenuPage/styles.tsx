import { FramedDiv } from "@/style/framedComponents";
import { styled } from "@linaria/react";

export const Content = styled(FramedDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  overflow: auto;
  gap: 5px;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h2``;
export const TitleDescription = styled.h4``;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  gap: 5px;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Description = styled.span`
  text-align: center;
`;
