import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "../redux/store";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/src/global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </Provider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
