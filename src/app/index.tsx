import { login } from "@/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "expo-router";

import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authState, appState } = useAppSelector((state) => state);

  function handleNavigate() {
    console.log("Navigating to login page");
    router.navigate("/Login");
  }

  function handleRedux() {
    console.log("States:", { authState, appState });
    console.log("States:", authState.isAuthenticated);
  }

  function handlePressLogin() {
    dispatch(login());
    console.log("logou:");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.heroSection}>
          <Text style={styles.title}>Hello World!</Text>
          <Button onPress={handleNavigate} title="Go to Login" />
          <Button onPress={() => router.navigate("/Home")} title="Go to Home" />
          <Button
            onPress={() => router.navigate("/notification")}
            title="Go to Notifications"
          />
          <Button onPress={handleRedux} title="Test Redux" />
          <Button onPress={handlePressLogin} title="Login" />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
