import { useContext } from "react";
import { SystemTheme, ThemeOption } from "../Theme";
import { ThemeContext } from "../contexts/ThemeContext";

export interface SelectedThemeHookOutput {
  currentTheme: ThemeOption;
  currentCustomTheme?: SystemTheme;
  setDarkMode(): void;
  setLightMode(): void;
  setSystemDefault(): void;
  setCustom(customTheme?: SystemTheme): void;
}

export const useSelectedTheme = (): SelectedThemeHookOutput => {
  const { currentTheme, setTheme, currentCustomTheme, setCustomTheme } =
    useContext(ThemeContext);

  return {
    currentTheme,
    currentCustomTheme,
    setDarkMode: () => setTheme(ThemeOption.DARK),
    setLightMode: () => setTheme(ThemeOption.LIGHT),
    setSystemDefault: () => setTheme(ThemeOption.SYSTEM),
    setCustom: (customeTheme?: SystemTheme) => {
      setTheme(ThemeOption.CUSTOM);
      if (customeTheme) {
        setCustomTheme(customeTheme);
      }
    },
  };
};
