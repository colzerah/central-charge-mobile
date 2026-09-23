import BackgroundGradient from "@/src/components/BackgroundGradient";
import TabNavigation from "@/src/components/TabNavigation";
import { Tabs } from "@/src/components/TabNavigation/TabNavigationDTO";
import Notifications from "@/src/components/Views/Notification";
import Recharges from "@/src/components/Views/Recharges";
import { useAppDispatch } from "@/src/redux/store";
import { useState } from "react";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  const TABS = [
    { value: "recargas", label: "Recargas", icon: "Zap" },
    { value: "notificacoes", label: "Notificações", icon: "Bell" },
  ] as Tabs[];

  const [tab, setTab] = useState<string>("recargas");
  return (
    <BackgroundGradient>
      <View style={styles.root}>
        <TabNavigation
          items={TABS}
          value={tab}
          onPress={(e) => {
            console.log(e);
            setTab(e);
          }}
        />
        {tab === "recargas" && (
          <View>
            <Recharges />
          </View>
        )}
        {tab === "notificacoes" && (
          <View>
            <Notifications />
          </View>
        )}
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 50,
    // flexDirection: "column",
    // alignItems: "center",
    // justifyContent: "center",
    gap: 50,
  },
});
