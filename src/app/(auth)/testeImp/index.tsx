import BackgroundGradient from "@/src/components/BackgroundGradient";
import SummaryCard from "@/src/components/SummaryCard";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        <SummaryCard icon="Zap" value="1.248 kWh" label="Total carregado" />
        <SummaryCard icon="Clock" value="42h 15min" label="Tempo total" />
        <SummaryCard icon="TrendingUp" value="R$ 1.089" label="Gasto total" />
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
