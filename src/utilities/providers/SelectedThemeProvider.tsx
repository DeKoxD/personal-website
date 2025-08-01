import { useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { ColorScheme, ThemeOption, getTheme } from "../Theme";
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
  const [preferedColorScheme, setPreferedColorScheme] = useState<ColorScheme>(
    ColorScheme.DARK
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: light)");

    function eventListener(e: MediaQueryListEvent) {
      setPreferedColorScheme(e.matches ? ColorScheme.LIGHT : ColorScheme.DARK);
    }

    mql.addEventListener("change", eventListener);

    return () => {
      mql.removeEventListener("change", eventListener);
    };
  }, []);

  useEffect(() => {
    onChange?.(theme, customTheme);
  }, [theme, customTheme, onChange, preferedColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        setTheme,
        currentCustomTheme: customTheme,
        setCustomTheme,
      }}
    >
      <ThemeProvider theme={getTheme(theme, customTheme)}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default SelectedThemeProvider;
