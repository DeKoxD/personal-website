import "styled-components";
import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
  }
}

export enum ThemeOption {
  DARK = "DARK",
  LIGHT = "LIGHT",
  SYSTEM = "SYSTEM",
  CUSTOM = "CUSTOM",
}

export const darkTheme: DefaultTheme = {
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
};

export const lightTheme: DefaultTheme = {
  primaryColor: "#ffffff",
  secondaryColor: "#000000",
};

export enum ColorScheme {
  DARK,
  LIGHT,
}

export function getTheme(
  selectedTheme: ThemeOption,
  customTheme?: DefaultTheme
): DefaultTheme {
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

export function getThemeOption(theme: DefaultTheme): ThemeOption {
  switch (theme) {
    case darkTheme:
      return ThemeOption.DARK;
    case lightTheme:
      return ThemeOption.LIGHT;
  }
  return ThemeOption.SYSTEM;
}

export function getLocalStorageThemeOption(): ThemeOption | undefined {
  const value = localStorage.getItem("theme");
  if (value) {
    return ThemeOption[value as keyof typeof ThemeOption];
  }
  return ThemeOption.SYSTEM;
}

export function getLocalStorageCustomeTheme() {
  const value = localStorage.getItem("customTheme");
  if (value) {
    return JSON.parse(value);
  }
  getTheme(ThemeOption.SYSTEM);
}

export function setLocalStorageCustomeTheme(
  theme: ThemeOption,
  customTheme?: DefaultTheme
) {
  localStorage.setItem("theme", theme.toString());
  if (theme === ThemeOption.CUSTOM && customTheme) {
    localStorage.setItem("customTheme", JSON.stringify(customTheme));
  }
}
