import { C } from "@/src/theme/index";
import {
  AlertTriangle,
  BatteryCharging,
  Bell,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Gift,
  Zap,
} from "lucide-react-native";
import React, { useCallback, useEffect } from "react";
import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type NotifType = "charge" | "alert" | "success" | "info" | "payment" | "gift";

interface Notif {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  day: string;
  month: string;
  read: boolean;
}

const NOTIFS: Notif[] = [
  {
    id: "1",
    type: "charge",
    title: "Carregamento concluído",
    message: "Sua carga atingiu 85% na Estação Centro em 38 minutos.",
    day: "16",
    month: "08",
    read: false,
  },
  {
    id: "2",
    type: "alert",
    title: "Estação offline",
    message: "Estação Sul está temporariamente indisponível para uso.",
    day: "16",
    month: "08",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Pagamento aprovado",
    message: "Cobrança de R$ 21,80 referente à última recarga confirmada.",
    day: "16",
    month: "08",
    read: false,
  },
  {
    id: "4",
    type: "info",
    title: "Nova estação disponível",
    message: "Estação Aeroporto foi inaugurada a 5,5 km de você.",
    day: "15",
    month: "08",
    read: false,
  },
  {
    id: "5",
    type: "charge",
    title: "Bateria fraca",
    message: "Sua bateria está em 18%. Encontre estações próximas agora.",
    day: "15",
    month: "08",
    read: true,
  },
  {
    id: "6",
    type: "gift",
    title: "Você ganhou 50 pontos",
    message: "Bônus por completar 5 recargas neste mês.",
    day: "14",
    month: "08",
    read: true,
  },
  {
    id: "7",
    type: "success",
    title: "Conta verificada",
    message: "Seu e-mail foi confirmado com sucesso no VoltCharge.",
    day: "14",
    month: "08",
    read: true,
  },
  {
    id: "8",
    type: "charge",
    title: "Recarga agendada",
    message: "Estação Norte reservada para amanhã às 08:00.",
    day: "13",
    month: "08",
    read: true,
  },
  {
    id: "9",
    type: "alert",
    title: "Manutenção programada",
    message: "Estação Parque estará em manutenção no dia 18/08.",
    day: "12",
    month: "08",
    read: true,
  },
  {
    id: "10",
    type: "payment",
    title: "Fatura fechada",
    message: "Sua fatura de agosto totalizou R$ 108,90.",
    day: "10",
    month: "08",
    read: true,
  },
];

const iconForType = (type: NotifType): React.ReactNode => {
  switch (type) {
    case "charge":
      return <BatteryCharging color={C.brand400} size={22} strokeWidth={2.2} />;
    case "alert":
      return <AlertTriangle color={C.error} size={22} strokeWidth={2.2} />;
    case "success":
      return <CheckCircle color={C.success} size={22} strokeWidth={2.2} />;
    case "info":
      return <Bell color={C.info} size={22} strokeWidth={2.2} />;
    case "payment":
      return <CreditCard color={C.brand400} size={22} strokeWidth={2.2} />;
    case "gift":
      return <Gift color={C.brand300} size={22} strokeWidth={2.2} />;
  }
};

const bgForType = (type: NotifType): string => {
  switch (type) {
    case "charge":
      return C.brand400 + "22";
    case "alert":
      return C.error + "22";
    case "success":
      return C.success + "22";
    case "info":
      return C.info + "22";
    case "payment":
      return C.brand400 + "22";
    case "gift":
      return C.brand300 + "22";
  }
};

const MONTHS = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export default function NotificacoesScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = useSharedValue(0);
  const headerO = useSharedValue(0);
  const headerY = useSharedValue(-20);
  const listO = useSharedValue(0);
  const listY = useSharedValue(24);
  const pullO = useSharedValue(0);
  const pullScale = useSharedValue(0.5);
  const pullRotate = useSharedValue(0);

  useEffect(() => {
    headerO.value = withDelay(80, withTiming(1, { duration: 400 }));
    headerY.value = withDelay(
      80,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }),
    );
    listO.value = withDelay(200, withTiming(1, { duration: 500 }));
    listY.value = withDelay(
      200,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
    );
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerO.value,
    transform: [{ translateY: headerY.value }],
  }));

  const listStyle = useAnimatedStyle(() => ({
    opacity: listO.value,
    transform: [{ translateY: listY.value }],
  }));

  const pullIndicatorStyle = useAnimatedStyle(() => {
    const showPull = interpolate(
      scrollY.value,
      [-80, -20, 0],
      [1, 0.5, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: pullO.value * showPull,
      transform: [
        { scale: pullScale.value },
        { rotate: `${pullRotate.value}deg` },
      ],
    };
  });

  const headerGlowStyle = useAnimatedStyle(() => {
    const glow = interpolate(
      scrollY.value,
      [-100, 0, 40],
      [0.6, 0, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: glow,
    };
  });

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

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    scrollY.value = y;
    if (y < 0 && !refreshing) {
      pullO.value = withTiming(1, { duration: 200 });
      const stretch = Math.min(Math.abs(y), 100);
      pullScale.value = withTiming(0.5 + (stretch / 100) * 0.6, {
        duration: 100,
      });
    }
  };

  const unread = NOTIFS.filter((n) => !n.read).length;

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>
        {/* Header */}
        <Animated.View style={headerStyle}>
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.headerTitle}>Notificações</Text>
                <Text style={styles.headerSubtitle}>
                  {unread > 0 ? `${unread} não lidas` : "Todas lidas"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.markAllBtn}
                onPress={() =>
                  Alert.alert(
                    "Tudo certo",
                    "Todas as notificações foram marcadas como lidas.",
                  )
                }
                activeOpacity={0.7}
              >
                <CheckCircle color={C.brand400} size={16} strokeWidth={2.2} />
                <Text style={styles.markAllText}>Marcar todas</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Animated.View style={[styles.headerGlow, headerGlowStyle]} />
        </Animated.View>

        {/* Pull-to-refresh indicator */}
        <Animated.View
          style={[styles.pullIndicator, pullIndicatorStyle]}
          pointerEvents="none"
        >
          <View style={styles.pullInner}>
            <Zap
              color={C.brand400}
              size={24}
              strokeWidth={2.5}
              fill={C.brand300}
            />
          </View>
        </Animated.View>

        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingTop: 8 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="transparent"
              colors={["transparent"]}
              progressBackgroundColor="transparent"
            />
          }
        >
          <Animated.View style={listStyle}>
            {NOTIFS.map((n, i) => (
              <NotifCard key={n.id} notif={n} index={i} />
            ))}

            <Text style={styles.endText}>Você está em dia</Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function NotifCard({ notif, index }: { notif: Notif; index: number }) {
  const cardO = useSharedValue(0);
  const cardY = useSharedValue(30);
  const pressed = useSharedValue(0);

  useEffect(() => {
    cardO.value = withDelay(250 + index * 50, withTiming(1, { duration: 400 }));
    cardY.value = withDelay(
      250 + index * 50,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.ease) }),
    );
  }, [index]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardO.value,
    transform: [
      { translateY: cardY.value },
      { scale: 1 - pressed.value * 0.03 },
    ],
  }));

  const iconScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pressed.value * 0.12 }],
  }));

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 120 });
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 150 });
  };

  const monthLabel = MONTHS[parseInt(notif.month, 10) - 1] || notif.month;

  return (
    <Animated.View style={cardStyle}>
      <TouchableOpacity
        style={[styles.card, !notif.read && styles.cardUnread]}
        activeOpacity={0.85}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => Alert.alert(notif.title, notif.message)}
      >
        {/* Ícone à esquerda */}
        <Animated.View style={iconScaleStyle}>
          <View
            style={[styles.iconBox, { backgroundColor: bgForType(notif.type) }]}
          >
            {iconForType(notif.type)}
          </View>
        </Animated.View>

        {/* Conteúdo */}
        <View style={styles.cardBody}>
          <View style={styles.cardHeader}>
            {!notif.read && <View style={styles.unreadDot} />}
            <Text style={styles.cardTitle} numberOfLines={1}>
              {notif.title}
            </Text>
          </View>
          <Text style={styles.cardMessage} numberOfLines={2}>
            {notif.message}
          </Text>
        </View>

        {/* Data no canto superior direito */}
        <View style={styles.dateBox}>
          <Text style={styles.dateDay}>{notif.day}</Text>
          <Text style={styles.dateMonth}>{monthLabel}</Text>
        </View>

        {/* Chevron */}
        <View style={styles.chevron}>
          <ChevronRight color={C.ink400} size={18} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.ink0 },
  flex: { flex: 1 },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: C.ink50,
    borderBottomWidth: 1,
    borderBottomColor: C.ink200,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  headerGlow: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: C.brand400,
    shadowColor: C.brand400,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  markAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: C.ink100,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: C.ink200,
  },
  markAllText: {
    fontSize: 12,
    color: C.brand400,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },

  // Pull indicator
  pullIndicator: {
    position: "absolute",
    top: 130,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 10,
  },
  pullInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: C.ink50,
    borderWidth: 2,
    borderColor: C.brand400,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    paddingHorizontal: 14,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cardUnread: {
    borderColor: C.ink300,
    backgroundColor: C.ink100,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.brand400,
    shadowColor: C.brand400,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    flexShrink: 1,
  },
  cardMessage: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 4,
    lineHeight: 17,
  },
  dateBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.ink100,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 42,
  },
  dateDay: {
    fontSize: 13,
    fontWeight: "700",
    color: C.ink300,
    fontFamily: "Inter-Bold",
    lineHeight: 15,
  },
  dateMonth: {
    fontSize: 8,
    fontWeight: "600",
    color: C.ink500,
    fontFamily: "Inter-SemiBold",
    lineHeight: 10,
  },
  chevron: {
    marginLeft: 6,
  },

  // End text
  endText: {
    textAlign: "center",
    fontSize: 12,
    color: C.ink500,
    fontFamily: "Inter-SemiBold",
    marginTop: 20,
  },
});
