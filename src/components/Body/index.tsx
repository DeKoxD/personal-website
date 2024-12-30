import { FC, PropsWithChildren } from "react";
import { Content, Wrapper } from "./style";

const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Body;
