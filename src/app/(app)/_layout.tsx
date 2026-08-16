import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* <Tabs
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
      </Tabs> */}
      <NativeTabs minimizeBehavior="onScrollDown" tabBarRespectsIMEInsets>
        <NativeTabs.Trigger name="Home">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "house", selected: "house.fill" }}
            md="home"
            xcasset={{
              default: "home-outline",
              selected: "home-filled",
            }}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="menu" role="favorites">
          <NativeTabs.Trigger.Label>Menu</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "list.bullet", selected: "list.bullet" }}
            md="menu"
            xcasset={{
              default: "menu-outline",
              selected: "menu-filled",
            }}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="recharges" role="favorites">
          <NativeTabs.Trigger.Label>Recargas</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: "bolt.fill", selected: "bolt.fill" }}
            md="flash_on"
            xcasset={{
              default: "flash-outline",
              selected: "flash-filled",
            }}
          />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="notification/index" disabled={false}>
          <NativeTabs.Trigger.Icon sf="bell.fill" md="notifications" />
          <NativeTabs.Trigger.Badge>9+</NativeTabs.Trigger.Badge>
          <NativeTabs.Trigger.Label>Notificações</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="search" role="search">
          <NativeTabs.Trigger.Icon md="search" />
          <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
