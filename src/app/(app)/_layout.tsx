import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        screenOptions={{
          headerShown: true,
        }}
      >
        <Tabs.Screen
          name="notification/index"
          options={{
            title: "Notifications",
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
