import { createContext } from "react";
import { DefaultTheme, ThemeOption } from "../Theme";

export interface ThemeContextValue {
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  currentCustomTheme?: DefaultTheme;
  setCustomTheme: (customTheme: DefaultTheme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue
);
