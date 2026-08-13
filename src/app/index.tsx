import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { useRouter } from "expo-router";
import { login } from "~/redux/authSlice";

import { Button, ButtonText } from "@/components/ui/button";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.authState);

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

  return (
    <View style={styles.container}>
      <Text>{`Authenticated: ${isAuthenticated}`}</Text>
      <SafeAreaView>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Hello World!</Text>
          <Button onPress={handleNavigate}>
            <ButtonText>Go to Login</ButtonText>
          </Button>
          <Button onPress={() => router.navigate("/Home")}>
            <ButtonText>Go to Home</ButtonText>
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
