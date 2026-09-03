import BackgroundGradient from "@/src/components/BackgroundGradient";
import RechargeCard from "@/src/components/RechargeCard";
import SummaryCard from "@/src/components/SummaryCard";
import { C } from "@/src/theme";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface Recharge {
  id: number;
  title: string;
  duration?: number;
  variant?: "default" | "info" | "danger" | "success" | "warning";
  kwh?: number;
  cost: number;
  tagTitle: string;
  onPress?: () => void;
  date: Date;
}

const RECHARGES: Recharge[] = [
  {
    id: 1,
    title: "Estação Centro",
    date: new Date("2023-08-14T14:32:00"),
    duration: 38,
    kwh: 24.5,
    cost: 21.8,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 2,
    title: "Estação Shopping",
    date: new Date("2023-08-12T09:15:00"),
    duration: 52,
    kwh: 35.2,
    cost: 32.38,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 3,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 4,
    title: "Estação Aeroporto",
    date: new Date("2023-08-16T08:00:00"),
    duration: 0,
    kwh: 0,
    cost: 0,
    variant: "info",
    tagTitle: "Agendado",
  },
  {
    id: 5,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 6,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "success",
    tagTitle: "Concluído",
  },
  {
    id: 7,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 25,
    kwh: 18.0,
    cost: 14.22,
    variant: "warning",
    tagTitle: "Pendente",
  },
  {
    id: 8,
    title: "Estação Norte",
    date: new Date("2023-08-10T18:44:00"),
    duration: 0,
    kwh: 0,
    cost: 0,
    variant: "danger",
    tagTitle: "Error",
  },
];

export default function RecargasScreen() {
  const contentO = useSharedValue(0);
  const contentY = useSharedValue(24);

  useEffect(() => {
    contentO.value = withDelay(100, withTiming(1, { duration: 500 }));
    contentY.value = withDelay(
      100,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
    );
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentO.value,
    transform: [{ translateY: contentY.value }],
  }));

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        <SafeAreaView style={styles.flex}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Recargas</Text>
            <Text style={styles.headerSubtitle}>Histórico e agendamentos</Text>
          </View>

          <View style={styles.summaryRow}>
            <SummaryCard icon="Zap" value="1.248 kWh" label="Total carregado" />
            <SummaryCard icon="Clock" value="42h 15min" label="Tempo total" />
            <SummaryCard
              icon="TrendingUp"
              value="R$ 1.089"
              label="Gasto total"
            />
          </View>
          <ScrollView
            style={styles.flex}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <Animated.View style={contentStyle}>
              <Text style={styles.sectionTitle}>Histórico recente</Text>
              <View style={{ marginHorizontal: 20, marginBottom: 12, gap: 12 }}>
                {RECHARGES.map((r) => (
                  <RechargeCard
                    key={r.id}
                    title={r.title}
                    duration={r.duration}
                    kwh={r.kwh}
                    cost={r.cost}
                    variant={r.variant}
                    tagTitle={r.tagTitle}
                    date={r.date}
                  />
                ))}
              </View>
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
});
