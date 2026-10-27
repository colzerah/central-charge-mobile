import RechargeCard from "@/src/components/RechargeCard";
import SummaryCard from "@/src/components/SummaryCard";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { RECHARGES_MOCK } from "./RechargesDTO";
import { rechargesStyles } from "./styles";

const Recharges = () => {
  const contentO = useSharedValue(1);
  const contentY = useSharedValue(24);

  // Tab screens stay mounted, so replay the entry animation on every focus
  // and reset it on blur so the next entry starts hidden.
  useFocusEffect(
    useCallback(() => {
      contentO.value = withDelay(100, withTiming(1, { duration: 500 }));
      contentY.value = withDelay(
        100,
        withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
      );
      return () => {
        contentO.value = 0;
        contentY.value = 24;
      };
    }, []),
  );

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentO.value,
    transform: [{ translateY: contentY.value }],
  }));

  return (
    <View>
      <View style={rechargesStyles.header}>
        <Text style={rechargesStyles.headerTitle}>Recargas</Text>
        <Text style={rechargesStyles.headerSubtitle}>
          Histórico e agendamentos
        </Text>
      </View>

      <View style={rechargesStyles.summaryRow}>
        <SummaryCard icon="Zap" value="1.248 kWh" label="Total carregado" />
        <SummaryCard icon="Clock" value="42h 15min" label="Tempo total" />
        <SummaryCard icon="TrendingUp" value="R$ 1.089" label="Gasto total" />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.View style={contentStyle}>
          <Text style={rechargesStyles.sectionTitle}>Histórico recente</Text>
          <View style={rechargesStyles.sectionView}>
            {RECHARGES_MOCK.map((recharge) => (
              <RechargeCard
                key={recharge.id}
                title={recharge.title}
                duration={recharge.duration}
                kwh={recharge.kwh}
                cost={recharge.cost}
                variant={recharge.variant}
                tagTitle={recharge.tagTitle}
                date={recharge.date}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Recharges;
