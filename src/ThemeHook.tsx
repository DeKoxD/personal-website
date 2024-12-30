import { SystemTheme, ThemeOption } from "./theme";

export interface ThemeHook {
  currentTheme: ThemeOption;
  currentCustomTheme?: SystemTheme;
  setDarkMode(): void;
  setLightMode(): void;
  setSystemDefault(): void;
  setCustom(customTheme?: SystemTheme): void;
}
