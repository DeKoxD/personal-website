import { useMemo } from "react";
import Homepage from "./pages/Homepage";
import { GlobalStyles } from "./style/GlobalStyles";
import { setCustomIcon } from "./utilities/IconGenerator";
import { SelectedThemeProvider } from "./utilities/SelectedThemeProvider";
import {
  getLocalStorageCustomeTheme,
  getLocalStorageThemeOption,
  setLocalStorageCustomeTheme,
  SystemTheme,
  ThemeOption,
} from "./utilities/Theme";

function App() {
  const theme = useMemo(() => {
    return getLocalStorageThemeOption();
  }, []);

  const customTheme = useMemo(() => {
    return getLocalStorageCustomeTheme();
  }, []);

  function onThemeChange(theme: ThemeOption, customTheme?: SystemTheme) {
    setLocalStorageCustomeTheme(theme, customTheme);
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
