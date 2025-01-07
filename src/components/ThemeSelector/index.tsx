import { useSelectedTheme } from "../../utilities/hooks/useSelectedTheme";
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
          onClick={setDarkMode}
        >
          D
        </ThemeButton>
        <ThemeButton
          $active={currentTheme == ThemeOption.LIGHT}
          onClick={setLightMode}
        >
          L
        </ThemeButton>
        <ThemeButton
          $active={currentTheme == ThemeOption.SYSTEM}
          onClick={setSystemDefault}
        >
          S
        </ThemeButton>
        <ThemeButton
          $active={currentTheme == ThemeOption.CUSTOM}
          onClick={() => setCustom()}
        >
          C
        </ThemeButton>
      </ButtonGrid>
    </Wrapper>
  );
}

export default ThemeSelector;
