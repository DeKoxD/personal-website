import ThemeCustomIcon from "@/assets/icons/theme-custom-icon.svg?react";
import ThemeDarkIcon from "@/assets/icons/theme-dark-icon.svg?react";
import ThemeLightIcon from "@/assets/icons/theme-light-icon.svg?react";
import ThemeSystemIcon from "@/assets/icons/theme-system-icon.svg?react";
import { ThemeOption } from "@/utilities/enums/ThemeOption";
import { useSelectedTheme } from "@/utilities/hooks/SelectedThemeHook";
import { useToastNotification } from "@/utilities/hooks/ToastNotificationHook";
import { getTheme } from "@/utilities/Theme";
import {
  ButtonGrid,
  ColorPicker,
  CustomColorSelector,
  InputLabel,
  ThemeButton,
  Wrapper,
} from "./styles";

const popUpMessages = {
  [ThemeOption.Dark]: "Dark theme applied",
  [ThemeOption.Light]: "Light theme applied",
  [ThemeOption.System]: "System theme applied",
  [ThemeOption.Custom]: "Custom theme applied",
};

function ThemeSelector() {
  const { currentTheme, currentCustomTheme, setTheme, setCustom } =
    useSelectedTheme();

  const { newNotification } = useToastNotification();

  const handleThemeChange = (themeOption: ThemeOption) => {
    const message = popUpMessages[themeOption];
    if (themeOption === currentTheme || !message) return;
    return () => {
      setTheme(themeOption);
      newNotification(message);
    };
  };

  return (
    <Wrapper>
      {currentTheme === ThemeOption.Custom && (
        <CustomColorSelector>
          <InputLabel>
            P:
            <ColorPicker
              type="color"
              value={currentCustomTheme?.primaryColor}
              onChange={({ target: { value } }) =>
                setCustom({
                  primaryColor: value,
                  secondaryColor:
                    currentCustomTheme?.secondaryColor ||
                    getTheme(currentTheme).secondaryColor,
                })
              }
            />
          </InputLabel>
          <InputLabel>
            S:
            <ColorPicker
              type="color"
              value={currentCustomTheme?.secondaryColor}
              onChange={({ target: { value } }) =>
                setCustom({
                  primaryColor:
                    currentCustomTheme?.primaryColor ||
                    getTheme(currentTheme).primaryColor,
                  secondaryColor: value,
                })
              }
            />
          </InputLabel>
        </CustomColorSelector>
      )}
      <span>Theme:</span>
      <ButtonGrid role="radiogroup" aria-label="Theme Selector">
        <ThemeButton
          role="radio"
          aria-label="Enable Dark Theme"
          aria-checked={currentTheme === ThemeOption.Dark}
          onClick={handleThemeChange(ThemeOption.Dark)}
        >
          <ThemeDarkIcon />
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-label="Enable Light Theme"
          aria-checked={currentTheme === ThemeOption.Light}
          onClick={handleThemeChange(ThemeOption.Light)}
        >
          <ThemeLightIcon />
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-label="Enable System Theme"
          aria-checked={currentTheme === ThemeOption.System}
          onClick={handleThemeChange(ThemeOption.System)}
        >
          <ThemeSystemIcon />
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-label="Enable Custom Theme"
          aria-checked={currentTheme === ThemeOption.Custom}
          onClick={handleThemeChange(ThemeOption.Custom)}
        >
          <ThemeCustomIcon />
        </ThemeButton>
      </ButtonGrid>
    </Wrapper>
  );
}

export default ThemeSelector;
