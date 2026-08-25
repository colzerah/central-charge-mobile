import { StackAwareTabBar } from "@/src/components/shared/ui/base/stack-aware-tabs";
import { Tabs } from "expo-router";

import { Bell, MapPin, Menu, QrCode, Zap } from "lucide-react-native";

export default function TabAndroidLayout() {
  return (
    <Tabs
      tabBar={(props) => <StackAwareTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        headerTitle: "Glow UI",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <MapPin size={20} color={focused ? "#FFFFFF" : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="recharges"
        options={{
          title: "Recargas",
          tabBarIcon: ({ focused }) => (
            <Zap size={20} color={focused ? "#FFFFFF" : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <QrCode size={20} color={focused ? "#FFFFFF" : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notificações",
          tabBarIcon: ({ focused }) => (
            <Bell size={20} color={focused ? "#FFFFFF" : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <Menu size={20} color={focused ? "#FFFFFF" : "#B9B9B9"} />
          ),
        }}
      />
    </Tabs>
  );
}
