import { DefaultTheme, ThemeOption } from "@/utilities/Theme";
import { createContext } from "react";

export interface ThemeContextValue {
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  currentCustomTheme?: DefaultTheme;
  setCustomTheme: (customTheme: DefaultTheme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue
);
