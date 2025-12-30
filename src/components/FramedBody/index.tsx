import ThemeSelector from "@/components/ThemeSelector";
import { FC, PropsWithChildren } from "react";
import {
  AltLetters,
  Content,
  Footer,
  Header,
  HiddenLetters,
  Main,
  Title,
  Wrapper,
} from "./styles";

const FramedBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Wrapper>
      <Content>
        <Header>
          <Title>
            A<HiddenLetters>NDRÉ </HiddenLetters>
            <AltLetters>P</AltLetters>
            <HiddenLetters>
              A<AltLetters>NT</AltLetters>A<AltLetters>L</AltLetters>EÃO
            </HiddenLetters>
          </Title>
        </Header>
        <Main>{children}</Main>
        <Footer>
          <ThemeSelector />
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default FramedBody;
