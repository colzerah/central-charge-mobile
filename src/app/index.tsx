import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { SplashScreen, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { login } from "~/redux/authSlice";

import { Button, ButtonText } from "@/components/ui/button";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { requestTeste } from "../service/requests/testeRequest";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.authState);

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-SemiBold": Inter_600SemiBold,
    "Inter-Bold": Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  function handleNavigate() {
    console.log("Navigating to login page");
    router.navigate("/Login");
  }

  function handleRedux() {
    console.log("States:", isAuthenticated);
  }

  function handlePressLogin() {
    dispatch(login());
    console.log("logou:");
  }

  function handleNavigateMap() {
    console.log("Navigating to map page");
    router.navigate("/Map");
  }

  async function getDados() {
    setLoading(true);
    try {
      const response = await requestTeste();
      console.log("Response from requestTeste:", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{`Authenticated: ${isAuthenticated}`}</Text>
      <SafeAreaView>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Hello World!</Text>
          <Button onPress={handleNavigate}>
            <ButtonText>Go to Login</ButtonText>
          </Button>
          <Button onPress={() => router.navigate("/home")}>
            <ButtonText>Go to Home</ButtonText>
          </Button>
          <Button onPress={() => router.navigate("/menu")}>
            <ButtonText>Go to Menu</ButtonText>
          </Button>
          <Button onPress={() => router.navigate("/recharges")}>
            <ButtonText>Go to Recargas</ButtonText>
          </Button>
          <Button
            onPress={() => router.navigate("/notification")}
            // title="Go to Notifications"
          >
            <ButtonText>Go to Notifications</ButtonText>
          </Button>
          <Button onPress={handleRedux}>
            <ButtonText>Test Redux</ButtonText>
          </Button>
          <Button onPress={handlePressLogin}>
            <ButtonText>Login</ButtonText>
          </Button>
          <Button onPress={getDados}>
            <ButtonText>Request Teste</ButtonText>
          </Button>
          <Button onPress={handleNavigateMap}>
            <ButtonText>Go to Map</ButtonText>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
  },
});
