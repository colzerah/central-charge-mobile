import BackgroundGradient from "@/src/components/BackgroundGradient";
import InputOpt from "@/src/components/InputOpt";
import { C } from "@/src/theme";
import { router, useLocalSearchParams } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { useEffect, useState } from "react";

import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
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
import { styles } from "./styles";

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export default function ViewSendCode() {
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const [generatedOtp, setGeneratedOtp] = useState(generateOtp);
  const [error, setError] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const logoO = useSharedValue(0);
  const logoScale = useSharedValue(0.7);
  const titleO = useSharedValue(0);
  const titleY = useSharedValue(20);
  const formO = useSharedValue(0);
  const formY = useSharedValue(30);

  useEffect(() => {
    logoO.value = withDelay(100, withTiming(1, { duration: 500 }));
    logoScale.value = withDelay(
      100,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }),
    );
    titleO.value = withDelay(100, withTiming(1, { duration: 500 }));
    titleY.value = withDelay(100, withTiming(0, { duration: 600 }));
    formO.value = withDelay(250, withTiming(1, { duration: 600 }));
    formY.value = withDelay(250, withTiming(0, { duration: 700 }));
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoO.value,
    transform: [{ scale: logoScale.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleO.value,
    transform: [{ translateY: titleY.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    opacity: formO.value,
    transform: [{ translateY: formY.value }],
  }));

  const handleOtpChange = () => {
    if (error) setError(false);
  };

  const handleOtpFinished = (code: string) => {
    if (code !== generatedOtp) {
      setError(true);
      return;
    }
    router.push("/new-password");
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setGeneratedOtp(generateOtp());
    setResendTimer(30);
    setError(false);
  };

  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          enabled
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.logoWrap, logoStyle]}>
              <View style={styles.logoCircle}>
                <ShieldCheck color={C.brand400} size={32} strokeWidth={2.4} />
              </View>
            </Animated.View>

            <Animated.View style={[styles.titleWrap, titleStyle]}>
              <Text style={styles.title}>Verificação</Text>
              <Text style={styles.subtitle}>
                {`Digite o código de 6 dígitos enviado para${"\n"}${phone || "seu telefone"}.`}
              </Text>
            </Animated.View>

            <Animated.View style={[styles.section, formStyle]}>
              <View style={styles.otpSection}>
                {/* key remonta o input e limpa os campos ao reenviar */}
                <InputOpt
                  key={generatedOtp}
                  error={error}
                  onChange={handleOtpChange}
                  onFinishedChange={handleOtpFinished}
                />

                {/* remover isso apos completar o fluxo */}
                <Text style={styles.otpHint}>
                  Código de demonstração:{" "}
                  <Text style={styles.otpCode}>{generatedOtp}</Text>
                </Text>

                <View style={styles.resendRow}>
                  <Text style={styles.resendText}>Não recebeu? </Text>
                  {resendTimer > 0 ? (
                    <Text style={styles.resendTimer}>
                      Reenviar em {resendTimer}s
                    </Text>
                  ) : (
                    <TouchableOpacity onPress={handleResend}>
                      <Text style={styles.resendLink}>Reenviar código</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BackgroundGradient>
  );
}
