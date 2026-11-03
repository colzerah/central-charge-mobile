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
import { useState } from "react";
import { useColorScheme, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Provider } from "react-redux";
import SplashAnimated from "../components/SplashAnimated";
import { useAuthBootstrap } from "../hooks/useAuth";
import { useOnboardingBootstrap } from "../hooks/useOnboarding";
import { ModalProvider } from "../providers/modal-provider";
import { ToastProvider } from "../providers/toast-provider";
import { store } from "../redux/store";
import { C } from "../theme";

// @gorhom/bottom-sheet 5.2.14 passa arrays de dependencia pros hooks do
// Reanimated, que no native sao ignorados e geram esse aviso. Filtra so
// essa mensagem ate a lib corrigir — remover quando atualizar o bottom-sheet.
if (__DEV__) {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Dependencies should only be used on the web")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

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

// A splash nativa só cobre o primeiro instante: assim que a SplashAnimated
// monta (mesmo visual), ela esconde a nativa e fica por cima até as
// fontes carregarem E a sessão e a flag do tour persistidas (AsyncStorage)
// serem lidas. As rotas só montam depois disso, para nunca desenhar
// (app), (auth) ou o onboarding com base num estado incompleto.
function AppReady() {
  const colorScheme = useColorScheme();
  const { isAuthenticated } = useAuthBootstrap();
  const { onboardingDone } = useOnboardingBootstrap();
  const [splashVisible, setSplashVisible] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  const fontsReady = fontsLoaded || !!fontError;
  const isReady =
    fontsReady && isAuthenticated !== null && onboardingDone !== null;

  return (
    <View style={{ flex: 1, backgroundColor: C.ink0 }}>
      {isReady && (
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ToastProvider>
            <BottomSheetModalProvider>
              <ModalProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: C.ink0 },
                  }}
                >
                  <Stack.Protected guard={!!isAuthenticated}>
                    <Stack.Screen name="(app)" />
                  </Stack.Protected>
                  <Stack.Protected
                    guard={isAuthenticated === false && !onboardingDone}
                  >
                    <Stack.Screen name="onboarding" />
                  </Stack.Protected>
                  <Stack.Protected
                    guard={isAuthenticated === false && !!onboardingDone}
                  >
                    <Stack.Screen name="(auth)" />
                  </Stack.Protected>
                </Stack>
              </ModalProvider>
            </BottomSheetModalProvider>
          </ToastProvider>
        </ThemeProvider>
      )}

      {splashVisible && (
        <SplashAnimated
          isReady={isReady}
          fontsReady={fontsReady}
          onFinish={() => setSplashVisible(false)}
        />
      )}
    </View>
  );
}
