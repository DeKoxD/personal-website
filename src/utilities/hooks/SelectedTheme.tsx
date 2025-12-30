import { DefaultTheme, ThemeOption } from "@/utilities/Theme";
import { ThemeContext } from "@/utilities/contexts/ThemeContext";
import { useContext } from "react";

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
