import { useMemo } from "react";
import Homepage from "./pages/Homepage";
import { GlobalStyles } from "./style/GlobalStyles";
import { setCustomIcon } from "./utilities/IconGenerator";
import SelectedThemeProvider from "./utilities/providers/SelectedThemeProvider";
import ToastNotificationProvider from "./utilities/providers/ToastNotificationProvider";
import {
  darkTheme,
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

  const defaultCustomTheme = useMemo(() => {
    return getLocalStorageCustomeTheme() || darkTheme;
  }, []);

  function onThemeChange(theme: ThemeOption, customTheme?: SystemTheme) {
    setLocalStorageCustomeTheme(theme, customTheme);
    setCustomIcon(theme, customTheme);
  }

  return (
    <>
      <SelectedThemeProvider
        defaultValue={theme}
        defaultCustomTheme={defaultCustomTheme}
        onChange={onThemeChange}
      >
        <ToastNotificationProvider>
          <GlobalStyles />
          <Homepage />
        </ToastNotificationProvider>
      </SelectedThemeProvider>
    </>
  );
}

export default App;
