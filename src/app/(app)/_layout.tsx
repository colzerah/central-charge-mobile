import { C } from "@/src/theme";
import { DarkTheme, DefaultTheme, Tabs, ThemeProvider } from "expo-router";
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import {
  Bell,
  LayoutGrid,
  MapPin,
  Menu,
  QrCode,
  Zap,
} from "lucide-react-native";
import React from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Tabs
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: C.brand400,
          tabBarInactiveTintColor: C.ink400,
        }}
      >
        <Tabs.Screen name="home" options={{ title: "Mapa" }} />
        <Tabs.Screen name="recharges" options={{ title: "Recargas" }} />
        <Tabs.Screen name="notification" options={{ title: "Notificações" }} />
        <Tabs.Screen name="menu" options={{ title: "Menu" }} />
        <Tabs.Screen name="search" options={{ title: "Buscar" }} />
      </Tabs>
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
      {/* <NativeTabs
        minimizeBehavior="onScrollDown"
        tabBarRespectsIMEInsets
        // tabBar={(props) => <FloatingTabBar {...props} />}
      >
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
      </NativeTabs> */}
    </ThemeProvider>
  );
}

const ICONS = {
  Home: MapPin,
  recharges: Zap,
  notification: Bell,
  menu: Menu,
  search: Zap,
} as const;

function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const handleQrPress = () => {
    Alert.alert(
      "Ler QR Code",
      "Aponte a câmera para o QR Code da estação para iniciar a recarga.",
    );
  };

  const visibleRoutes = state.routes.filter(
    (route) => descriptors[route.key].options.title !== "Buscar",
  );

  return (
    <View style={styles.barWrap}>
      <View style={styles.bar}>
        {/* {state.routes.map((route, index) => { */}
        {visibleRoutes.map((route, index) => {
          console.log("route", route.name);
          const { options } = descriptors[route.key];
          // const isFocused = state.index === index;
          const isFocused = state.routes[state.index].key === route.key;
          const Icon = ICONS[route.name as keyof typeof ICONS] ?? LayoutGrid;
          const label =
            typeof options.title === "string" ? options.title : route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: "tabLongPress", target: route.key });
          };

          return (
            <React.Fragment key={route.key}>
              {index === 2 && <View style={styles.centerGap} />}
              <Pressable
                accessibilityRole="tab"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
              >
                <Icon
                  color={isFocused ? C.brand400 : C.ink400}
                  size={21}
                  strokeWidth={2.2}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? C.brand400 : C.ink400 },
                  ]}
                >
                  {label}
                </Text>
              </Pressable>
            </React.Fragment>
          );
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Ler QR Code da estação"
        onPress={handleQrPress}
        style={({ pressed }) => [
          styles.qrButton,
          pressed && styles.qrButtonPressed,
        ]}
      >
        <View style={styles.qrButtonInner}>
          <QrCode color={C.ink0} size={26} strokeWidth={2.2} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  barWrap: {
    height: 82,
    backgroundColor: C.ink50,
    borderTopWidth: 1,
    borderTopColor: C.ink200,
    position: "relative",
  },
  bar: {
    height: 82,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 3,
    gap: 4,
  },
  tabLabel: {
    fontFamily: "Inter-SemiBold",
    fontSize: 10,
  },
  centerGap: {
    width: 74,
    flexShrink: 0,
  },
  qrButton: {
    position: "absolute",
    alignSelf: "center",
    top: -30,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: C.brand400,
    borderWidth: 5,
    borderColor: C.ink0,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  qrButtonPressed: {
    transform: [{ scale: 0.94 }],
    backgroundColor: C.brand300,
  },
  qrButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: C.brand300,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: C.brand600,
  },
});
