import { useContext } from "react";
import { DefaultTheme } from "styled-components";
import { ThemeOption } from "../Theme";
import { ThemeContext } from "../contexts/ThemeContext";

export interface SelectedThemeHookOutput {
  currentTheme: ThemeOption;
  currentCustomTheme?: DefaultTheme;
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
    setDarkMode: () => setTheme(ThemeOption.DARK),
    setLightMode: () => setTheme(ThemeOption.LIGHT),
    setSystemDefault: () => setTheme(ThemeOption.SYSTEM),
    setCustom: (customeTheme?: DefaultTheme) => {
      setTheme(ThemeOption.CUSTOM);
      if (customeTheme) {
        setCustomTheme(customeTheme);
      }
    },
  };
};
