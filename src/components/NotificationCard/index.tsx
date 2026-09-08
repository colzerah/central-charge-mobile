import { ChevronRight, Trash2 } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    Extrapolation,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from "react-native-reanimated";

import DateBadge from "@/src/components/DateBadge";
import IconBackground from "@/src/components/IconBackground";
import { C } from "@/src/theme";

import { getNotificationIconBackground } from "./utils";

import { getNotificationIcon } from "./utils";

import { NotificationCardProps } from "./NotificationCardDTO";

import { styles } from "./styles";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const NotificationCard = ({
  notification,
  index = 0,
  onPress,
  onDelete,
}: NotificationCardProps) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);

  const pressed = useSharedValue(0);

  const translateX = useSharedValue(0);
  const deleteOpacity = useSharedValue(0);

  const itemHeight = useSharedValue(1);

  // Animação de entrada
  useEffect(() => {
    const delay = 250 + index * 50;

    cardOpacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 400,
      }),
    );

    cardTranslateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: 500,
      }),
    );
  }, [index]);

  // Gesture de swipe
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      translateX.value = Math.min(0, event.translationX);

      deleteOpacity.value = interpolate(
        translateX.value,
        [-15, 0],
        [1, 0],
        Extrapolation.CLAMP,
      );
    })
    .onEnd((event) => {
      const shouldDelete = event.translationX < -140;

      if (shouldDelete) {
        translateX.value = withTiming(-600, {
          duration: 220,
        });

        itemHeight.value = withDelay(
          60,
          withTiming(0, {
            duration: 220,
          }),
        );

        if (onDelete) {
          runOnJS(onDelete)(notification);
        }

        return;
      }

      translateX.value = withSpring(0, {
        damping: 18,
      });

      deleteOpacity.value = withTiming(0, {
        duration: 200,
      });
    });

  // Animação do card
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,

    transform: [
      {
        translateY: cardTranslateY.value,
      },
      {
        scale: 1 - pressed.value * 0.03,
      },
    ],
  }));

  // Movimento horizontal
  const swipeStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  // Animação ao remover
  const containerStyle = useAnimatedStyle(() => ({
    opacity: itemHeight.value,

    transform: [
      {
        scaleY: itemHeight.value,
      },
    ],
  }));

  // Background vermelho
  const deleteBackgroundStyle = useAnimatedStyle(() => ({
    opacity: deleteOpacity.value,
  }));

  // Animação da lixeira
  const deleteIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          translateX.value,
          [-160, -120, 0],
          [1.35, 1, 1],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  // Animação do IconBackground
  const iconScaleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: 1 + pressed.value * 0.12,
      },
    ],
  }));

  const handlePressIn = () => {
    pressed.value = withTiming(1, {
      duration: 120,
    });
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, {
      duration: 150,
    });
  };

  const handlePress = () => {
    onPress?.(notification);
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.swipeWrap}>
        {/* Background de exclusão */}
        <Animated.View
          pointerEvents="none"
          style={[styles.deleteBackground, deleteBackgroundStyle]}
        >
          <Animated.View style={deleteIconStyle}>
            <Trash2 color={C.ink0} size={24} strokeWidth={2.2} />
          </Animated.View>
        </Animated.View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={swipeStyle}>
            <Animated.View style={cardStyle}>
              <AnimatedPressable
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.card, !notification.read && styles.cardUnread]}
              >
                {/* Icon */}
                <Animated.View style={iconScaleStyle}>
                  <IconBackground
                    icon={getNotificationIcon(notification.type)}
                    size="md"
                    backgroundColor={getNotificationIconBackground(
                      notification.type,
                    )}
                    iconColor={C.brand400}
                  />
                </Animated.View>

                {/* Conteúdo */}
                <View style={styles.cardBody}>
                  <View style={styles.cardHeader}>
                    {!notification.read && <View style={styles.unreadDot} />}

                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {notification.title}
                    </Text>
                  </View>

                  <Text style={styles.cardMessage} numberOfLines={2}>
                    {notification.message}
                  </Text>
                </View>

                {/* Data */}
                <DateBadge day={notification.day} month={notification.month} />

                {/* Chevron */}
                <View style={styles.chevron}>
                  <ChevronRight color={C.ink400} size={18} />
                </View>
              </AnimatedPressable>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Animated.View>
  );
};

export default NotificationCard;
