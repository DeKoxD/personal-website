import { FC, PropsWithChildren } from "react";
import ThemeSelector from "../ThemeSelector";
import { AltLetters, Content, Footer, Header, Title, Wrapper } from "./styles";

const Body: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Header>
          <div></div>
          <Title>
            ANDRÉ <AltLetters>P</AltLetters>A<AltLetters>NT</AltLetters>A
            <AltLetters>L</AltLetters>EÃO
          </Title>
        </Header>
        {children}
        <Footer>
          <div></div>
          <ThemeSelector />
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Body;
