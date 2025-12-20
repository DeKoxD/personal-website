import { useEffect, useState } from "react";
import { ColorScheme, DefaultTheme, ThemeOption, getTheme } from "../Theme";
import { ThemeContext } from "../contexts/ThemeContext";

export interface Props extends React.PropsWithChildren {
  defaultValue?: ThemeOption;
  defaultCustomTheme?: DefaultTheme;
  onChange?: (value: ThemeOption, customTheme?: DefaultTheme) => void;
}

const SelectedThemeProvider: React.FC<Props> = ({
  children,
  defaultValue = ThemeOption.SYSTEM,
  defaultCustomTheme,
  onChange,
}): React.ReactElement => {
  const [theme, setTheme] = useState<ThemeOption>(defaultValue);
  const [customTheme, setCustomTheme] = useState<DefaultTheme | undefined>(
    defaultCustomTheme
  );
  const [preferredColorScheme, setPreferredColorScheme] = useState<ColorScheme>(
    ColorScheme.DARK
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
      secondaryColor
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
