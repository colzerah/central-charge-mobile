import { C } from "@/src/theme";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import Icon from "../Icon";
import StaggeredText from "../shared/ui/organisms/animated-text";
import { SplashAnimatedProps } from "./SplashAnimatedDTO";
import { styles } from "./styles";

// Cada linha entra letra por letra quando a anterior termina, e todas
// ficam na tela até a splash sumir.
const LINES = [
  { text: "Central Charge", style: styles.title, lineStyle: styles.titleLine },
  {
    text: "Energia onde você estiver",
    style: styles.phrase,
    lineStyle: styles.phraseLine,
  },
  {
    text: "Conecte. Carregue. Siga.",
    style: styles.phrase,
    lineStyle: styles.phraseLine,
  },
];

// No Android o BlurView só desfoca de verdade com um BlurTargetView;
// sem ele aparece só a camada do tint. Lá as letras entram sem blur.
const TEXT_CONFIG = {
  characterDelay: 30,
  characterEnterDuration: 350,
  maxBlurIntensity: Platform.OS === "ios" ? 12 : 0,
};

// Tempo até a última letra da linha terminar de entrar
const lineEnterTime = (text: string) =>
  text.length * TEXT_CONFIG.characterDelay + TEXT_CONFIG.characterEnterDuration;

// Linha do tempo, em ms, contada a partir do carregamento das fontes
const FIRST_LINE_IN = 600;
const LINE_GAP = 100;
const READ_PAUSE = 800;
const LINE_STARTS = LINES.map(
  (_, index) =>
    FIRST_LINE_IN +
    LINES.slice(0, index).reduce(
      (total, line) => total + lineEnterTime(line.text) + LINE_GAP,
      0,
    ),
);
const SEQUENCE_DONE =
  LINE_STARTS[LINES.length - 1] +
  lineEnterTime(LINES[LINES.length - 1].text) +
  READ_PAUSE;
const FADE_OUT_DURATION = 400;

// O logo começa no centro, na mesma posição da splash nativa, e sobe
// logo em seguida para o conjunto logo + textos ficar mais alto na tela.
const LIFT = 90;

const SplashAnimated = ({
  isReady,
  fontsReady,
  onFinish,
}: SplashAnimatedProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [sequenceDone, setSequenceDone] = useState(false);

  const opacity = useSharedValue(1);
  const glow = useSharedValue(0);
  const pulse = useSharedValue(0);
  const ringScale = useSharedValue(0);
  const ringOpacity = useSharedValue(0);
  const charge = useSharedValue(0);
  const boltRotate = useSharedValue(0);
  const lift = useSharedValue(0);

  // Mesma animação do LogoAnimated, menos a entrada do raio: aqui ele já
  // começa no lugar, igual à splash nativa, e só balança.
  useEffect(() => {
    lift.value = withDelay(
      150,
      withTiming(-LIFT, { duration: 700, easing: Easing.out(Easing.cubic) }),
    );
    glow.value = withTiming(1, { duration: 500 });
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1400, easing: Easing.out(Easing.ease) }),
        withTiming(0.4, { duration: 1400, easing: Easing.in(Easing.ease) }),
      ),
      -1,
    );
    boltRotate.value = withDelay(
      800,
      withRepeat(
        withSequence(
          withTiming(7, { duration: 700, easing: Easing.inOut(Easing.ease) }),
          withTiming(-7, { duration: 700, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
      ),
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
  }, []);

  useEffect(() => {
    if (!fontsReady) return;

    const timers = [
      ...LINE_STARTS.map((start, index) =>
        setTimeout(() => setVisibleLines(index + 1), start),
      ),
      setTimeout(() => setSequenceDone(true), SEQUENCE_DONE),
    ];
    return () => timers.forEach(clearTimeout);
  }, [fontsReady]);

  // Só sai quando o app terminou de carregar E a sequência acabou.
  useEffect(() => {
    if (!isReady || !sequenceDone) return;

    opacity.value = withTiming(
      0,
      { duration: FADE_OUT_DURATION },
      (finished) => {
        if (finished) scheduleOnRN(onFinish);
      },
    );
  }, [isReady, sequenceDone]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: lift.value }],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    opacity: 0.35 * pulse.value,
    transform: [{ scale: 0.85 + pulse.value * 0.3 }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value * (0.6 + pulse.value * 0.4),
    transform: [{ scale: ringScale.value }],
  }));

  const chargeStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
    transform: [{ rotate: `${charge.value * 360}deg` }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    shadowOpacity: 0.8 * glow.value,
    transform: [{ rotate: `${boltRotate.value}deg` }],
  }));

  return (
    <Animated.View
      style={[styles.container, containerStyle]}
      onLayout={() => SplashScreen.hideAsync()}
    >
      {/* Sobe o conteúdo, não o container, para o fundo continuar
          cobrindo a tela inteira */}
      <Animated.View style={[styles.content, contentStyle]}>
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.halo, haloStyle]} />
          <Animated.View style={[styles.ring, ringStyle]} />
          <Animated.View style={[styles.chargeRing, chargeStyle]}>
            <View style={styles.chargeDot} />
          </Animated.View>
          <Animated.View style={[styles.badge, badgeStyle]}>
            <Icon
              color={C.brand400}
              size={42}
              name="Zap"
              strokeWidth={2.4}
              fill={C.brand300}
            />
          </Animated.View>
        </View>

        <View style={styles.linesWrap}>
          {LINES.map((line, index) => (
            <View key={line.text} style={line.lineStyle}>
              <StaggeredText
                text={index < visibleLines ? line.text : ""}
                style={line.style}
                animationConfig={TEXT_CONFIG}
                blurTint="dark"
              />
            </View>
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashAnimated;
