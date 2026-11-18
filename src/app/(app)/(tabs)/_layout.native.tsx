import TabBar from "@/src/components/TabBar";
import { C } from "@/src/theme";
import { Tabs } from "expo-router";

import { Bell, MapPin, Menu, QrCode, Star } from "lucide-react-native";

import { useTheme } from "@/src/hooks/useTheme";
import { useTranslation } from "@/src/hooks/useTranslation";
export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        // Por padrão cada aba só é montada na primeira visita, o que trava a
        // troca (~1s em Notificações). Assim todas são pré-carregadas logo
        // depois que a Home abre.
        lazy: false,
        headerShown: false,
        headerTitle: "TabBar",
        sceneStyle: { backgroundColor: colors.ink0 },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabs.home") /* pt: "Home" */,
          tabBarIcon: ({ focused }) => (
            <MapPin size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t("tabs.favorites") /* pt: "Favoritos" */,
          tabBarIcon: ({ focused }) => (
            <Star size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: t("tabs.scan") /* pt: "Scan" */,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <QrCode size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: t("tabs.notifications") /* pt: "Notificações" */,
          tabBarIcon: ({ focused }) => (
            <Bell size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: t("tabs.menu") /* pt: "Menu" */,
          tabBarIcon: ({ focused }) => (
            <Menu size={22} color={focused ? C.brand500 : "#B9B9B9"} />
          ),
        }}
      />
    </Tabs>
  );
}
