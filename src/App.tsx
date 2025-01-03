import { useMemo } from "react";
import Homepage from "./pages/Homepage";
import { SelectedThemeProvider } from "./SelectedThemeProvider";
import { GlobalStyles } from "./style/GlobalStyles";
import { darkTheme, SystemTheme, ThemeOption } from "./theme";
import { setCustomIcon } from "./utilities/IconGenerator";

function App() {
  const theme = useMemo(() => {
    const value = localStorage.getItem("theme");
    if (value) {
      return ThemeOption[value as keyof typeof ThemeOption];
    }
  }, []);

  const customTheme = useMemo(() => {
    const value = localStorage.getItem("customTheme");
    if (value) {
      return JSON.parse(value);
    }
    return darkTheme;
  }, []);

  function onThemeChange(theme: ThemeOption, customTheme?: SystemTheme) {
    localStorage.setItem("theme", theme.toString());
    if (theme === ThemeOption.CUSTOM && customTheme) {
      localStorage.setItem("customTheme", JSON.stringify(customTheme));
    }
    setCustomIcon(theme, customTheme);
  }
  return (
    <>
      <SelectedThemeProvider
        defaultValue={theme}
        defaultCustomTheme={customTheme}
        onChange={onThemeChange}
      >
        <GlobalStyles />
        <Homepage />
      </SelectedThemeProvider>
    </>
  );
}

export default App;
