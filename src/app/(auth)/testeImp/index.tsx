import BackgroundGradient from "@/src/components/BackgroundGradient";
import TabNavigation from "@/src/components/TabNavigation/";
import { Tabs } from "@/src/components/TabNavigation/TabNavigationDTO";
import { useAppDispatch } from "@/src/redux/store";
import { useState } from "react";
import { Text } from "react-native";

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
            <Text style={{ color: "white" }}>Tela de Recargas</Text>
          </View>
        )}
        {tab === "notificacoes" && (
          <View>
            <Text style={{ color: "white" }}>Tela de Notificações</Text>
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
    gap: 10,
  },
});
