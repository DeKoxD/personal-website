import { ThemeContext } from "@/utilities/contexts/ThemeContext";
import { LocalStorageKey } from "@/utilities/enums/LocalStorageKeys";
import { useLocalStorage } from "@/utilities/hooks/LocalStorageHook";
import { ColorScheme, DefaultTheme, getTheme } from "@/utilities/Theme";
import { useEffect, useState } from "react";
import { ThemeOption } from "../enums/ThemeOption";

export interface Props extends React.PropsWithChildren {
  defaultValue?: ThemeOption;
  defaultCustomTheme?: DefaultTheme;
  onChange?: (value: ThemeOption, customTheme?: DefaultTheme) => void;
}

const SelectedThemeProvider: React.FC<Props> = ({
  children,
  defaultValue = ThemeOption.System,
  defaultCustomTheme,
  onChange,
}): React.ReactElement => {
  const [theme, setTheme] = useLocalStorage<ThemeOption>(
    LocalStorageKey.Theme,
    defaultValue,
  );
  const [customTheme, setCustomTheme] = useLocalStorage<
    DefaultTheme | undefined
  >(LocalStorageKey.CustomTheme, defaultCustomTheme);
  const [preferredColorScheme, setPreferredColorScheme] = useState<ColorScheme>(
    ColorScheme.DARK,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: light)");

    function eventListener(e: MediaQueryListEvent) {
      setPreferredColorScheme(e.matches ? ColorScheme.LIGHT : ColorScheme.DARK);
    }

    mql.addEventListener("change", eventListener);

    return () => {
      mql.removeEventListener("change", eventListener);
    };
  }, []);

  useEffect(() => {
    onChange?.(theme, customTheme);
    const { primaryColor, secondaryColor } = getTheme(theme, customTheme);
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor,
    );
  }, [theme, customTheme, onChange, preferredColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        setTheme,
        currentCustomTheme: customTheme,
        setCustomTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default SelectedThemeProvider;
