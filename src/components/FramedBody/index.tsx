import DesktopFooterIcon from "@/assets/icons/desktop-footer-icon.svg?react";
import DesktopFullscreenIcon from "@/assets/icons/desktop-fullscreen-icon.svg?react";
import DesktopSidebarIcon from "@/assets/icons/desktop-sidebar-icon.svg?react";
import PhoneFooterIcon from "@/assets/icons/phone-footer-icon.svg?react";
import PhoneMenubarIcon from "@/assets/icons/phone-menubar-icon.svg?react";
import Navbar from "@/components/Navbar";
import ThemeSelector from "@/components/ThemeSelector";
import { hideOnMobile, showOnMobile } from "@/style/responsiveness";
import { LocalStorageKey } from "@/utilities/enums/LocalStorageKeys";
import { useLocalStorage } from "@/utilities/hooks/LocalStorageHook";
import { FC, PropsWithChildren } from "react";
import {
  AltLetters,
  ButtonBar,
  Content,
  Footer,
  FullscreenButton,
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
          <ButtonBar style={{ display: "flex" }}>
            <OptionButton
              role="switch"
              aria-checked={bottomMenuEnabled}
              onClick={() => setBottomMenuEnabled((state) => !state)}
            >
              <DesktopFooterIcon className={hideOnMobile} />
              <PhoneFooterIcon className={showOnMobile} />
            </OptionButton>
            <OptionButton
              role="switch"
              aria-checked={sidebarEnabled}
              onClick={() => setSidebarEnabled((state) => !state)}
            >
              <DesktopSidebarIcon className={hideOnMobile} />
              <PhoneMenubarIcon className={showOnMobile} />
            </OptionButton>
            <FullscreenButton
              role="switch"
              aria-checked={fullWidth}
              onClick={() => setFullWidth((state) => !state)}
            >
              <DesktopFullscreenIcon />
            </FullscreenButton>
          </ButtonBar>
          <Title>
            A<HiddenLetters>NDRÉ </HiddenLetters>
            <AltLetters>P</AltLetters>
            <HiddenLetters>
              A<AltLetters>NT</AltLetters>A<AltLetters>L</AltLetters>EÃO
            </HiddenLetters>
          </Title>
        </Header>
        <MiddleSection>
          {sidebarEnabled && <Navbar></Navbar>}

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
