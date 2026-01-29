import MainRouter from "@/routes/MainRouter";
import { globalStyles } from "@/style/globalStyles";
import { setCustomIcon } from "@/utilities/IconGenerator";
import SelectedThemeProvider from "@/utilities/providers/SelectedThemeProvider";
import ToastNotificationProvider from "@/utilities/providers/ToastNotificationProvider";
import { DefaultTheme } from "@/utilities/Theme";
import { ThemeOption } from "./utilities/enums/ThemeOption";

function App() {
  function onThemeChange(theme: ThemeOption, customTheme?: DefaultTheme) {
    setCustomIcon(theme, customTheme);
  }

  return (
    <>
      <SelectedThemeProvider onChange={onThemeChange}>
        <ToastNotificationProvider>
          <div className={globalStyles} />
          <MainRouter />
        </ToastNotificationProvider>
      </SelectedThemeProvider>
    </>
  );
}

export default App;
