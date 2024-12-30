import { getTheme, ThemeOption } from "../../theme";
import { useSelectedTheme } from "../../useSelectedTheme";
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
          className={currentTheme == ThemeOption.DARK ? "active" : ""}
          onClick={setDarkMode}
        >
          D
        </ThemeButton>
        <ThemeButton
          className={currentTheme == ThemeOption.LIGHT ? "active" : ""}
          onClick={setLightMode}
        >
          L
        </ThemeButton>
        <ThemeButton
          className={currentTheme == ThemeOption.SYSTEM ? "active" : ""}
          onClick={setSystemDefault}
        >
          S
        </ThemeButton>
        <ThemeButton
          className={currentTheme == ThemeOption.CUSTOM ? "active" : ""}
          onClick={() => setCustom()}
        >
          C
        </ThemeButton>
      </ButtonGrid>
    </Wrapper>
  );
}

export default ThemeSelector;
