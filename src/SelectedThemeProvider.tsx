import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { SystemTheme, ThemeOption, getTheme } from "./theme";
import { ThemeContext } from "./ThemeContext";

export interface Props extends React.PropsWithChildren {
  defaultValue?: ThemeOption;
  defaultCustomTheme?: SystemTheme;
  onChange?: (value: ThemeOption, customTheme?: SystemTheme) => void;
}

export const SelectedThemeProvider: React.FC<Props> = ({
  children,
  defaultValue = ThemeOption.SYSTEM,
  defaultCustomTheme,
  onChange,
}): React.ReactElement => {
  const [theme, setTheme] = useState<ThemeOption>(defaultValue);
  const [customTheme, setCustomTheme] = useState<SystemTheme | undefined>(
    defaultCustomTheme
  );

  useEffect(() => {
    onChange?.(theme, customTheme);
  }, [theme, customTheme, onChange]);

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
