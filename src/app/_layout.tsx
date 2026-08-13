import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Provider>
    </ThemeProvider>
  );
}
