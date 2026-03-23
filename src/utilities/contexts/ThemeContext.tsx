import { DefaultTheme } from "@/utilities/Theme";
import { createContext } from "react";
import { ThemeOption } from "../enums/ThemeOption";

export interface ThemeContextValue {
  currentTheme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  currentCustomTheme?: DefaultTheme;
  setCustomTheme: (customTheme: DefaultTheme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>(
  {} as ThemeContextValue,
);
