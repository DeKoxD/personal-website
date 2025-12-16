import { useContext } from "react";
import { DefaultTheme, ThemeOption } from "../Theme";
import { ThemeContext } from "../contexts/ThemeContext";

export interface SelectedThemeHookOutput {
  currentTheme: ThemeOption;
  currentCustomTheme?: DefaultTheme;
  setTheme(themeOption: ThemeOption): void;
  setDarkMode(): void;
  setLightMode(): void;
  setSystemDefault(): void;
  setCustom(customTheme?: DefaultTheme): void;
}

export const useSelectedTheme = (): SelectedThemeHookOutput => {
  const { currentTheme, setTheme, currentCustomTheme, setCustomTheme } =
    useContext(ThemeContext);

  return {
    currentTheme,
    currentCustomTheme,
    setTheme,
    setDarkMode: () => setTheme(ThemeOption.DARK),
    setLightMode: () => setTheme(ThemeOption.LIGHT),
    setSystemDefault: () => setTheme(ThemeOption.SYSTEM),
    setCustom: (customTheme?: DefaultTheme) => {
      setTheme(ThemeOption.CUSTOM);
      if (customTheme) {
        setCustomTheme(customTheme);
      }
    },
  };
};
