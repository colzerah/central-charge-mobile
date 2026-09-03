import BackgroundGradient from "@/src/components/BackgroundGradient";
import { C } from "@/src/theme";
import { BatteryCharging, Clock, TrendingUp, Zap } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface Recharge {
  id: string;
  station: string;
  date: string;
  duration: string;
  energy: string;
  cost: string;
  status: "completed" | "active" | "scheduled";
}

const RECHARGES: Recharge[] = [
  {
    id: "1",
    station: "Estação Centro",
    date: "14 Ago, 14:32",
    duration: "38 min",
    energy: "24.5 kWh",
    cost: "R$ 21,80",
    status: "completed",
  },
  {
    id: "2",
    station: "Estação Shopping",
    date: "12 Ago, 09:15",
    duration: "52 min",
    energy: "35.2 kWh",
    cost: "R$ 32,38",
    status: "completed",
  },
  {
    id: "3",
    station: "Estação Norte",
    date: "10 Ago, 18:44",
    duration: "25 min",
    energy: "18.0 kWh",
    cost: "R$ 14,22",
    status: "completed",
  },
  {
    id: "4",
    station: "Estação Aeroporto",
    date: "16 Ago, 08:00",
    duration: "—",
    energy: "—",
    cost: "R$ 0,00",
    status: "scheduled",
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

        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Cards de resumo */}
          <View style={styles.summaryRow}>
            <SummaryCard
              icon={<Zap color={C.brand400} size={20} strokeWidth={2.2} />}
              value="1.248 kWh"
              label="Total carregado"
            />
            <SummaryCard
              icon={<Clock color={C.brand400} size={20} strokeWidth={2.2} />}
              value="42h 15min"
              label="Tempo total"
            />
            <SummaryCard
              icon={
                <TrendingUp color={C.brand400} size={20} strokeWidth={2.2} />
              }
              value="R$ 1.089"
              label="Gasto total"
            />
          </View>

          <Animated.View style={contentStyle}>
            <Text style={styles.sectionTitle}>Histórico recente</Text>
            {RECHARGES.map((r) => (
              <RechargeCard key={r.id} recharge={r} />
            ))}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
    </BackgroundGradient>
  );
}

function SummaryCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryIcon}>{icon}</View>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function RechargeCard({ recharge }: { recharge: Recharge }) {
  const statusColor =
    recharge.status === "completed"
      ? C.success
      : recharge.status === "active"
        ? C.warning
        : C.info;
  const statusLabel =
    recharge.status === "completed"
      ? "Concluída"
      : recharge.status === "active"
        ? "Em curso"
        : "Agendada";

  return (
    <TouchableOpacity style={styles.rechargeCard} activeOpacity={0.8}>
      <View
        style={[styles.rechargeIcon, { backgroundColor: statusColor + "20" }]}
      >
        <BatteryCharging color={statusColor} size={22} strokeWidth={2.2} />
      </View>
      <View style={styles.rechargeInfo}>
        <Text style={styles.rechargeStation}>{recharge.station}</Text>
        <Text style={styles.rechargeDate}>{recharge.date}</Text>
        <View style={styles.rechargeStats}>
          <Text style={styles.rechargeStat}>{recharge.duration}</Text>
          <Text style={styles.rechargeDot}>•</Text>
          <Text style={styles.rechargeStat}>{recharge.energy}</Text>
        </View>
      </View>
      <View style={styles.rechargeRight}>
        <Text style={styles.rechargeCost}>{recharge.cost}</Text>
        <View
          style={[
            styles.rechargeStatus,
            { backgroundColor: statusColor + "20" },
          ]}
        >
          <View
            style={[styles.rechargeStatusDot, { backgroundColor: statusColor }]}
          />
          <Text style={[styles.rechargeStatusText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
  summaryCard: {
    flex: 1,
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 14,
    alignItems: "center",
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  summaryLabel: {
    fontSize: 10,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  rechargeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  rechargeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  rechargeInfo: { flex: 1, marginLeft: 14 },
  rechargeStation: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  rechargeDate: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  rechargeStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  rechargeStat: { fontSize: 12, color: C.ink300, fontFamily: "Inter-SemiBold" },
  rechargeDot: { fontSize: 12, color: C.ink400 },
  rechargeRight: { alignItems: "flex-end" },
  rechargeCost: {
    fontSize: 15,
    fontWeight: "700",
    color: C.brand400,
    fontFamily: "Inter-Bold",
    marginBottom: 6,
  },
  rechargeStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rechargeStatusDot: { width: 6, height: 6, borderRadius: 3 },
  rechargeStatusText: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
});
