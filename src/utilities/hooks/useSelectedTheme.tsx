import { useContext } from "react";
import { SystemTheme, ThemeOption } from "../Theme";
import { ThemeContext } from "../ThemeContext";
import { ThemeHook } from "./ThemeHook";
export const useSelectedTheme = (): ThemeHook => {
  const { currentTheme, setTheme, currentCustomTheme, setCustomTheme } =
    useContext(ThemeContext);

  return {
    currentTheme,
    currentCustomTheme,
    setDarkMode: () => setTheme(ThemeOption.DARK),
    setLightMode: () => setTheme(ThemeOption.LIGHT),
    setSystemDefault: () => setTheme(ThemeOption.SYSTEM),
    setCustom: (customeTheme: SystemTheme) => {
      setTheme(ThemeOption.CUSTOM);
      if (customeTheme) {
        setCustomTheme(customeTheme);
      }
    },
  };
};
