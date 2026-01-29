import Sidebar from "@/components/Sidebar";
import ThemeSelector from "@/components/ThemeSelector";
import { LocalStorageKey } from "@/utilities/enums/LocalStorageKeys";
import { useLocalStorage } from "@/utilities/hooks/LocalStorageHook";
import { FC, PropsWithChildren } from "react";
import {
  AltLetters,
  Content,
  Footer,
  Header,
  HiddenLetters,
  Main,
  MiddleSection,
  OptionButton,
  Title,
  Wrapper,
} from "./styles";

const FramedBody: FC<PropsWithChildren> = ({ children }) => {
  const [bottomMenuEnabled, setBottomMenuEnabled] = useLocalStorage(
    LocalStorageKey.BottomMenuEnabled,
    true,
  );
  const [sidebarEnabled, setSidebarEnabled] = useLocalStorage(
    LocalStorageKey.SidebarEnabled,
    true,
  );
  const [fullWidth, setFullWidth] = useLocalStorage(
    LocalStorageKey.FullWidth,
    true,
  );
  return (
    <Wrapper>
      <Content fullWidth={fullWidth}>
        <Header>
          <div style={{ display: "flex" }}>
            <OptionButton
              role="switch"
              aria-checked={bottomMenuEnabled}
              onClick={() => setBottomMenuEnabled((state) => !state)}
            >
              M
            </OptionButton>

            <OptionButton
              role="switch"
              aria-checked={sidebarEnabled}
              onClick={() => setSidebarEnabled((state) => !state)}
            >
              S
            </OptionButton>
            <OptionButton
              role="switch"
              aria-checked={fullWidth}
              onClick={() => setFullWidth((state) => !state)}
            >
              F
            </OptionButton>
          </div>
          <Title>
            A<HiddenLetters>NDRÉ </HiddenLetters>
            <AltLetters>P</AltLetters>
            <HiddenLetters>
              A<AltLetters>NT</AltLetters>A<AltLetters>L</AltLetters>EÃO
            </HiddenLetters>
          </Title>
        </Header>
        <MiddleSection>
          {sidebarEnabled && <Sidebar></Sidebar>}

          <Main>{children}</Main>
        </MiddleSection>
        {bottomMenuEnabled && (
          <Footer>
            <ThemeSelector />
          </Footer>
        )}
      </Content>
    </Wrapper>
  );
};

export default FramedBody;
