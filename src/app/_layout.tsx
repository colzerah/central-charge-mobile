import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";

import {
  DarkTheme,
  DefaultTheme,
  SplashScreen,
  Stack,
  ThemeProvider,
} from "expo-router";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";
import { useAuthBootstrap } from "../hooks/useAuth";
import { ModalProvider } from "../providers/modal-provider";
import { store } from "../redux/store";
import { C } from "../theme";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync(C.ink0);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <Provider store={store}>
          <AppReady />
        </Provider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

// Fica visível na splash screen até as fontes carregarem E a sessão
// persistida (AsyncStorage) ser lida, para nunca desenhar (app) ou
// (auth) com base num estado ainda incompleto.
function AppReady() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthBootstrap();

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  const isReady = (fontsLoaded || !!fontError) && isAuthenticated !== null;

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <BottomSheetModalProvider>
        <ModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Protected guard={!!isAuthenticated}>
              <Stack.Screen name="(app)" />
            </Stack.Protected>
            <Stack.Protected guard={isAuthenticated === false}>
              <Stack.Screen name="(auth)" />
            </Stack.Protected>
          </Stack>
        </ModalProvider>
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
}
