import NotificationCard from "@/src/components/NotificationCard";
import { C } from "@/src/theme";
import { CheckCircle, Zap } from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";

import {
  Alert,
  RefreshControl,
  ScrollView,
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
import { NOTIFICATION_MOCK, NotificationProps } from "./NotificationDTO";
import { notificationStyles } from "./styles";

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

const Notifications = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [notifs, setNotifs] = useState<NotificationProps[]>(NOTIFICATION_MOCK);
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

  const unread = notifs.filter((n) => !n.read).length;

  const handleDelete = useCallback((id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleOpen = useCallback((id: string) => {
    // router.push(`/notif/${id}`);
  }, []);

  return (
    <View style={notificationStyles.root}>
      <Animated.View style={headerStyle}>
        <View style={notificationStyles.header}>
          <View style={notificationStyles.headerRow}>
            <View>
              <Text style={notificationStyles.headerTitle}>Notificações</Text>
              <Text style={notificationStyles.headerSubtitle}>
                {unread > 0 ? `${unread} não lidas` : "Todas lidas"}
              </Text>
            </View>
            <TouchableOpacity
              style={notificationStyles.markAllBtn}
              onPress={() =>
                Alert.alert(
                  "Tudo certo",
                  "Todas as notificações foram marcadas como lidas.",
                )
              }
              activeOpacity={0.7}
            >
              <CheckCircle color={C.brand400} size={16} strokeWidth={2.2} />
              <Text style={notificationStyles.markAllText}>Marcar todas</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Animated.View
          style={[notificationStyles.headerGlow, headerGlowStyle]}
        />
      </Animated.View>

      {/* Pull-to-refresh indicator */}
      <Animated.View
        style={[notificationStyles.pullIndicator, pullIndicatorStyle]}
        pointerEvents="none"
      >
        <View style={notificationStyles.pullInner}>
          <Zap
            color={C.brand400}
            size={24}
            strokeWidth={2.5}
            fill={C.brand300}
          />
        </View>
      </Animated.View>

      <ScrollView
        style={notificationStyles.flex}
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
          {notifs.map((n, i) => (
            <NotificationCard
              key={n.id}
              type={n.type}
              title={n.title}
              message={n.message}
              day={Number(n.day)}
              month={MONTHS[Number(n.month) - 1] || n.month}
              read={n.read}
              animationDelay={250 + i * 50}
              onDelete={() => handleDelete(n.id)}
              onPress={() => handleOpen(n.id)}
            />
          ))}

          {notifs.length === 0 && (
            <View style={notificationStyles.emptyWrap}>
              <CheckCircle color={C.ink400} size={40} strokeWidth={1.5} />
              <Text style={notificationStyles.emptyText}>Sem notificações</Text>
            </View>
          )}

          <Text style={notificationStyles.endText}>Você está em dia</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Notifications;
