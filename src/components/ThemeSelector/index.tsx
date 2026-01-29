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
      <ButtonGrid>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.Dark}
          onClick={handleThemeChange(ThemeOption.Dark)}
        >
          D
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.Light}
          onClick={handleThemeChange(ThemeOption.Light)}
        >
          L
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.System}
          onClick={handleThemeChange(ThemeOption.System)}
        >
          S
        </ThemeButton>
        <ThemeButton
          role="radio"
          aria-checked={currentTheme == ThemeOption.Custom}
          onClick={handleThemeChange(ThemeOption.Custom)}
        >
          C
        </ThemeButton>
      </ButtonGrid>
    </Wrapper>
  );
}

export default ThemeSelector;
