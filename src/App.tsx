import { useMemo } from "react";
import Homepage from "./pages/Homepage";
import { GlobalStyles } from "./style/GlobalStyles";
import { setCustomIcon } from "./utilities/IconGenerator";
import { SelectedThemeProvider } from "./utilities/SelectedThemeProvider";
import { darkTheme, SystemTheme, ThemeOption } from "./utilities/Theme";

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
