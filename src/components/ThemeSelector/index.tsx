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
} from "./style";

function ThemeSelector() {
  const {
    currentTheme,
    currentCustomTheme,
    setDarkMode,
    setLightMode,
    setSystemDefault,
    setCustom,
  } = useSelectedTheme();

  const { newNotification } = useToastNotification();

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
          $active={currentTheme == ThemeOption.DARK}
          onClick={() => {
            setDarkMode();
            newNotification("Dark theme applied");
          }}
        >
          D
        </ThemeButton>
        <ThemeButton
          $active={currentTheme == ThemeOption.LIGHT}
          onClick={() => {
            setLightMode();
            newNotification("Light theme applied");
          }}
        >
          L
        </ThemeButton>
        <ThemeButton
          $active={currentTheme == ThemeOption.SYSTEM}
          onClick={() => {
            setSystemDefault();
            newNotification("System theme applied");
          }}
        >
          S
        </ThemeButton>
        <ThemeButton
          $active={currentTheme == ThemeOption.CUSTOM}
          onClick={() => {
            setCustom();
            newNotification("Custom theme applied");
          }}
        >
          C
        </ThemeButton>
      </ButtonGrid>
    </Wrapper>
  );
}

export default ThemeSelector;
