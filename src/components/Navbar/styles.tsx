import { FramedNav } from "@/style/framedComponents";
import { Sizes } from "@/utilities/constants/Layout";
import { styled } from "@linaria/react";

export const Container = styled(FramedNav)`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  @media (max-width: ${Sizes.MobileMaxWidth}) {
    height: fit-content;
    max-width: 100%;
    max-height: 200px;
  }

  & a.active {
    font-weight: 900;
  }

  & * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow-x: hidden;
  }
`;
