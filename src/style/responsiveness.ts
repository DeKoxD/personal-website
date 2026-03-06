import { Sizes } from "@/utilities/constants/Layout";
import { css } from "@linaria/core";

export const showOnMobile = css`
  display: none;
  @media (max-width: ${Sizes.MobileMaxWidth}) {
    display: inherit;
  }
`;

export const hideOnMobile = css`
  @media (max-width: ${Sizes.MobileMaxWidth}) {
    display: none;
  }
`;
