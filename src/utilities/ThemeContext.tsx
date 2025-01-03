import { createContext } from "react";
import { SystemTheme, ThemeOption } from "./utilities/Theme";

export interface ThemeContextValue {
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  currentCustomTheme?: SystemTheme;
  setCustomTheme: (customTheme: SystemTheme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue
);
