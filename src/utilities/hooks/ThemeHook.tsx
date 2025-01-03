import { SystemTheme, ThemeOption } from "../Theme";

export interface ThemeHook {
  currentTheme: ThemeOption;
  currentCustomTheme?: SystemTheme;
  setDarkMode(): void;
  setLightMode(): void;
  setSystemDefault(): void;
  setCustom(customTheme?: SystemTheme): void;
}
