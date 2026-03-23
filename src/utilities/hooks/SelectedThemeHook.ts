import { ThemeContext } from "@/utilities/contexts/ThemeContext";
import { DefaultTheme } from "@/utilities/Theme";
import { useContext } from "react";
import { ThemeOption } from "../enums/ThemeOption";

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
    setDarkMode: () => setTheme(ThemeOption.Dark),
    setLightMode: () => setTheme(ThemeOption.Light),
    setSystemDefault: () => setTheme(ThemeOption.System),
    setCustom: (customTheme?: DefaultTheme) => {
      setTheme(ThemeOption.Custom);
      if (customTheme) {
        setCustomTheme(customTheme);
      }
    },
  };
};
