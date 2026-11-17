import { useTranslation } from "@/src/hooks/useTranslation";
import RechargeCard from "@/src/components/RechargeCard";
import SummaryCard from "@/src/components/SummaryCard";
import { C } from "@/src/theme";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  RechargeProps,
  RECHARGES_MOCK,
  ViewRechargesProps,
} from "./RechargesDTO";
import { rechargesStyles } from "./styles";

const ViewRecharges = ({ tabs }: ViewRechargesProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { t, language } = useTranslation();

  const contentO = useSharedValue(1);
  const contentY = useSharedValue(24);
  const pullO = useSharedValue(0);
  const pullScale = useSharedValue(0.5);
  const pullRotate = useSharedValue(0);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    pullRotate.value = 0;
    pullRotate.value = withTiming(360, {
      duration: 1000,
      easing: Easing.linear,
    });
    pullScale.value = withSequence(
      withSpring(1.1, { damping: 12 }),
      withTiming(1, { duration: 300 }),
    );
    setTimeout(() => {
      setRefreshing(false);
      pullO.value = withTiming(0, { duration: 300 });
      pullScale.value = withTiming(0.5, { duration: 300 });
    }, 1200);
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentO.value,
    transform: [{ translateY: contentY.value }],
  }));

  const renderItem = ({ item }: { item: RechargeProps }) => (
    <View style={{ marginHorizontal: 14, marginBottom: 12 }}>
      <RechargeCard
        {...item}
        // O status vem traduzido pela variante (o texto do mock é ignorado)
        tagTitle={t(`recharges.status.${item.variant ?? "default"}`) /* pt: recharges.status.* → "Concluída", "Agendada", "Pendente", … */}
      />
    </View>
  );

  const emptyComponent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ color: C.white, fontSize: 16, fontFamily: "Inter-Regular" }}
      >
        {t("recharges.empty") /* pt: "Nenhuma recarga encontrada" */}
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={rechargesStyles.header}>
        <Text style={rechargesStyles.headerTitle}>{t("recharges.title") /* pt: "Recargas" */}</Text>
        <Text style={rechargesStyles.headerSubtitle}>
          {t("recharges.subtitle") /* pt: "Histórico e agendamentos" */}
        </Text>
      </View>

      {tabs}

      <View style={rechargesStyles.summaryRow}>
        <SummaryCard icon="Zap" value="1.248 kWh" label={t("recharges.totalCharged") /* pt: "Total carregado" */} />
        <SummaryCard icon="Clock" value="42h 15min" label={t("recharges.totalTime") /* pt: "Tempo total" */} />
        <SummaryCard icon="TrendingUp" value="R$ 1.089" label={t("recharges.totalSpent") /* pt: "Gasto total" */} />
      </View>

      <Animated.View style={[contentStyle, { flex: 1 }]}>
        <Text style={rechargesStyles.sectionTitle}>{t("recharges.recent") /* pt: "Histórico recente" */}</Text>
        <FlashList
          data={RECHARGES_MOCK}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          style={{ flex: 1 }}
          contentContainerStyle={rechargesStyles.listContent}
          ListEmptyComponent={emptyComponent}
          extraData={language}
          // onEndReached={} recarregar mais dados
          // onEndReachedThreshold={0.5}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </Animated.View>
    </View>
  );
};

export default ViewRecharges;
