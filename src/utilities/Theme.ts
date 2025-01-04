import { DefaultTheme } from "styled-components";

export interface SystemTheme {
  primaryColor: string;
  secondaryColor: string;
}

export enum ThemeOption {
  DARK = "DARK",
  LIGHT = "LIGHT",
  SYSTEM = "SYSTEM",
  CUSTOM = "CUSTOM",
}

export const darkTheme: SystemTheme = {
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
};

export const lightTheme: SystemTheme = {
  primaryColor: "#ffffff",
  secondaryColor: "#000000",
};

export function getTheme(
  selectedTheme: ThemeOption,
  customTheme?: SystemTheme
): SystemTheme {
  switch (selectedTheme) {
    case ThemeOption.DARK:
      return darkTheme;
    case ThemeOption.LIGHT:
      return lightTheme;
    case ThemeOption.SYSTEM:
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        return lightTheme;
      }
      return darkTheme;
    case ThemeOption.CUSTOM:
      return customTheme || getTheme(ThemeOption.SYSTEM);
  }
}

export function getThemeOption(theme: SystemTheme | DefaultTheme): ThemeOption {
  switch (theme) {
    case darkTheme:
      return ThemeOption.DARK;
    case lightTheme:
      return ThemeOption.LIGHT;
  }
  return ThemeOption.SYSTEM;
}
