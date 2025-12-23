import { useMemo } from "react";
import MainRouter from "./routes/MainRouter";
import { globalStyles } from "./style/globalStyles";
import { setCustomIcon } from "./utilities/IconGenerator";
import SelectedThemeProvider from "./utilities/providers/SelectedThemeProvider";
import ToastNotificationProvider from "./utilities/providers/ToastNotificationProvider";
import {
  darkTheme,
  DefaultTheme,
  getLocalStorageCustomeTheme,
  getLocalStorageThemeOption,
  setLocalStorageCustomeTheme,
  ThemeOption,
} from "./utilities/Theme";

function App() {
  const theme = useMemo(() => {
    return getLocalStorageThemeOption();
  }, []);

  const defaultCustomTheme = useMemo(() => {
    return getLocalStorageCustomeTheme() || darkTheme;
  }, []);

  function onThemeChange(theme: ThemeOption, customTheme?: DefaultTheme) {
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
          <div className={globalStyles} />
          <MainRouter />
        </ToastNotificationProvider>
      </SelectedThemeProvider>
    </>
  );
}

export default App;
