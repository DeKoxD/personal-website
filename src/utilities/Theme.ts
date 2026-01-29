import { ThemeOption } from "./enums/ThemeOption";

export interface DefaultTheme {
  primaryColor: string;
  secondaryColor: string;
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
  customTheme?: DefaultTheme,
): DefaultTheme {
  switch (selectedTheme) {
    case ThemeOption.Dark:
      return darkTheme;
    case ThemeOption.Light:
      return lightTheme;
    case ThemeOption.System:
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
      ) {
        return lightTheme;
      }
      return darkTheme;
    case ThemeOption.Custom:
      return customTheme || getTheme(ThemeOption.System);
  }
}

export function getThemeOption(theme: DefaultTheme): ThemeOption {
  switch (theme) {
    case darkTheme:
      return ThemeOption.Dark;
    case lightTheme:
      return ThemeOption.Light;
  }
  return ThemeOption.System;
}

export function getLocalStorageThemeOption(): ThemeOption | undefined {
  const value = localStorage.getItem("theme");
  if (value) {
    return ThemeOption[value as keyof typeof ThemeOption];
  }
  return ThemeOption.System;
}

export function getLocalStorageCustomTheme() {
  const value = localStorage.getItem("customTheme");
  if (value) {
    return JSON.parse(value);
  }
  getTheme(ThemeOption.System);
}

export function setLocalStorageCustomTheme(
  theme: ThemeOption,
  customTheme?: DefaultTheme,
) {
  localStorage.setItem("theme", theme.toString());
  if (theme === ThemeOption.Custom && customTheme) {
    localStorage.setItem("customTheme", JSON.stringify(customTheme));
  }
}
