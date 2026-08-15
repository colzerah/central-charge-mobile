import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import Icon from "../Icon";

import { useEffect } from "react";
import { C, styles } from "./styles";

const LogoAnimated = () => {
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.out(Easing.ease) }),
        withTiming(0.4, { duration: 1400, easing: Easing.in(Easing.ease) }),
      ),
      -1,
    );

    boltScale.value = withDelay(
      200,
      withTiming(1, { duration: 600, easing: Easing.back(2) }, () => {
        boltRotate.value = withRepeat(
          withSequence(
            withTiming(7, { duration: 700, easing: Easing.inOut(Easing.ease) }),
            withTiming(-7, {
              duration: 700,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(0, { duration: 700, easing: Easing.inOut(Easing.ease) }),
          ),
          -1,
        );
      }),
    );

    ringOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
    ringScale.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(1.15, { duration: 1600, easing: Easing.out(Easing.ease) }),
          withTiming(0.95, { duration: 1600, easing: Easing.in(Easing.ease) }),
        ),
        -1,
      ),
    );

    charge.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.linear }),
      -1,
    );

    titleO.value = withDelay(400, withTiming(1, { duration: 500 }));
    titleY.value = withDelay(400, withTiming(0, { duration: 600 }));
    socialO.value = withDelay(850, withTiming(1, { duration: 600 }));
  }, []);

  const pulse = useSharedValue(0);
  const boltScale = useSharedValue(0);
  const boltRotate = useSharedValue(0);
  const ringScale = useSharedValue(0);
  const ringOpacity = useSharedValue(0);
  const titleO = useSharedValue(0);
  const titleY = useSharedValue(20);
  const socialO = useSharedValue(0);
  const charge = useSharedValue(0);

  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.35 * pulse.value,
    transform: [{ scale: 0.85 + pulse.value * 0.3 }],
  }));

  const boltStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: boltScale.value },
      { rotate: `${boltRotate.value}deg` },
    ],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value * (0.6 + pulse.value * 0.4),
    transform: [{ scale: ringScale.value }],
  }));

  const chargeStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
    transform: [{ rotate: `${charge.value * 360}deg` }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleO.value,
    transform: [{ translateY: titleY.value }],
  }));

  return (
    <View style={styles.logoWrap}>
      <View style={styles.logoContainer}>
        <Animated.View style={[styles.halo, haloStyle]} />
        <Animated.View style={[styles.ring, ringStyle]} />
        <Animated.View style={[styles.chargeRing, chargeStyle]}>
          <View style={styles.chargeDot} />
        </Animated.View>
        <Animated.View style={[styles.bolt, boltStyle]}>
          <Icon
            color={C.brand400}
            size={42}
            name="Zap"
            strokeWidth={2.4}
            fill={C.brand300}
          />
        </Animated.View>
      </View>

      <Animated.View style={[styles.titleWrap, titleStyle]}>
        <Text style={styles.brand}>Central Charge</Text>
        <Text style={styles.subtitle}>Entre e carregue seu veículo</Text>
      </Animated.View>
    </View>
  );
};

export default LogoAnimated;
