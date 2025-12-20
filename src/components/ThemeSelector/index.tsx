import { useSelectedTheme } from "../../utilities/hooks/SelectedTheme";
import { useToastNotification } from "../../utilities/hooks/ToastNotificationHook";
import { getTheme, ThemeOption } from "../../utilities/Theme";
import {
  ButtonGrid,
  ColorPicker,
  CustomColorSelector,
  InputLabel,
  ThemeButton,
  Wrapper,
} from "./styles";

const popUpMessages = {
  [ThemeOption.DARK]: "Dark theme applied",
  [ThemeOption.LIGHT]: "Light theme applied",
  [ThemeOption.SYSTEM]: "System theme applied",
  [ThemeOption.CUSTOM]: "Custom theme applied",
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
      {currentTheme === ThemeOption.CUSTOM && (
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
      <ButtonGrid>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.DARK}
          onClick={handleThemeChange(ThemeOption.DARK)}
        >
          D
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.LIGHT}
          onClick={handleThemeChange(ThemeOption.LIGHT)}
        >
          L
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.SYSTEM}
          onClick={handleThemeChange(ThemeOption.SYSTEM)}
        >
          S
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.CUSTOM}
          onClick={handleThemeChange(ThemeOption.CUSTOM)}
        >
          C
        </ThemeButton>
      </ButtonGrid>
    </Wrapper>
  );
}

export default ThemeSelector;
