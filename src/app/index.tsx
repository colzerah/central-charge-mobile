import { useRouter } from "expo-router";

import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();

  function handleNavigate() {
    console.log("Navigating to login page");
    router.navigate("/Login");
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
