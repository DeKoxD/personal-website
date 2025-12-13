import { FC, PropsWithChildren } from "react";
import ThemeSelector from "../ThemeSelector";
import {
  AltLetters,
  Body,
  Content,
  Footer,
  Header,
  Title,
  Wrapper,
} from "./styles";

const FramedPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Header>
          <div></div>
          <Title href="/">
            ANDRÉ <AltLetters>P</AltLetters>A<AltLetters>NT</AltLetters>A
            <AltLetters>L</AltLetters>EÃO
          </Title>
        </Header>
        <Body>{children}</Body>
        <Footer>
          <div></div>
          <ThemeSelector />
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default FramedPage;
