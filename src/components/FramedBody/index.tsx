import DesktopFooterIcon from "@/assets/icons/desktop-footer-icon.svg?react";
import DesktopFullscreenIcon from "@/assets/icons/desktop-fullscreen-icon.svg?react";
import DesktopSidebarIcon from "@/assets/icons/desktop-sidebar-icon.svg?react";
import NotificationIcon from "@/assets/icons/notification-icon.svg?react";
import PhoneFooterIcon from "@/assets/icons/phone-footer-icon.svg?react";
import PhoneMenubarIcon from "@/assets/icons/phone-menubar-icon.svg?react";
import Navbar from "@/components/Navbar";
import ThemeSelector from "@/components/ThemeSelector";
import { hideOnMobile, showOnMobile } from "@/style/responsiveness";
import { LocalStorageKey } from "@/utilities/enums/LocalStorageKeys";
import { useLocalStorage } from "@/utilities/hooks/LocalStorageHook";
import { useToastNotification } from "@/utilities/hooks/ToastNotificationHook";
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

enum Messages {
  NavbarEnabled = "Navigation Bar Enabled",
  NavbarDisabled = "Navigation Bar Disabled",
  FooterEnabled = "Bottom Bar Enabled",
  FooterDisabled = "Bottom Bar Disabled",
  FullscreenEnabled = "Fullscreen Enabled",
  FullscreenDisabled = "Fullscreen Disabled",
}

const FramedBody: FC<PropsWithChildren> = ({ children }) => {
  const { newNotification, notificationsEnabled, toggleNotifications } =
    useToastNotification();

  const [bottomMenuEnabled, setBottomMenuEnabled] = useLocalStorage(
    LocalStorageKey.BottomMenuEnabled,
    true,
  );
  const [navbarEnabled, setNavbarEnabled] = useLocalStorage(
    LocalStorageKey.NavbarEnabled,
    false,
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
              aria-label="Toggle Bottom Bar"
              aria-checked={bottomMenuEnabled}
              onClick={() => {
                newNotification(
                  bottomMenuEnabled
                    ? Messages.FooterDisabled
                    : Messages.FooterEnabled,
                );

                setBottomMenuEnabled((state) => !state);
              }}
            >
              <DesktopFooterIcon className={hideOnMobile} />
              <PhoneFooterIcon className={showOnMobile} />
            </OptionButton>
            <OptionButton
              role="switch"
              aria-label="Toggle Navigation Bar"
              aria-checked={navbarEnabled}
              onClick={() => {
                newNotification(
                  navbarEnabled
                    ? Messages.NavbarDisabled
                    : Messages.NavbarEnabled,
                );

                setNavbarEnabled((state) => !state);
              }}
            >
              <DesktopSidebarIcon className={hideOnMobile} />
              <PhoneMenubarIcon className={showOnMobile} />
            </OptionButton>
            <FullscreenButton
              role="switch"
              aria-label="Toggle Fullscreen mode"
              aria-checked={fullWidth}
              onClick={() => {
                newNotification(
                  fullWidth
                    ? Messages.FullscreenDisabled
                    : Messages.FullscreenEnabled,
                );

                setFullWidth((state) => !state);
              }}
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
          {navbarEnabled && <Navbar></Navbar>}

          <Main>{children}</Main>
        </MiddleSection>
        {bottomMenuEnabled && (
          <Footer>
            <OptionButton
              role="switch"
              aria-checked={notificationsEnabled}
              onClick={toggleNotifications}
            >
              <NotificationIcon />
            </OptionButton>
            <ThemeSelector />
          </Footer>
        )}
      </Content>
    </Wrapper>
  );
};

export default FramedBody;
