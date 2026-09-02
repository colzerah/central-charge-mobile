import MenuStatCard from "@/src/components/MenuStatCard";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.root}>
      <MenuStatCard
        stats={[
          {
            value: "1.248",
            label: "kWh total",
          },
          {
            value: "47",
            label: "recargas",
          },
          {
            value: "8.2",
            label: "tCO₂ evitado",
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
