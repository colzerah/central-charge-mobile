import TabBar from "@/src/components/TabBar";
import { C } from "@/src/theme";
import { Tabs } from "expo-router";

import { Bell, MapPin, Menu, QrCode, Zap } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerTitle: "TabBar",
        sceneStyle: { backgroundColor: C.ink0 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MapPin size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="recharges"
        options={{
          title: "Recargas",
          tabBarIcon: ({ focused }) => (
            <Zap size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <QrCode size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notificações",
          tabBarIcon: ({ focused }) => (
            <Bell size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <Menu size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
    </Tabs>
  );
}
