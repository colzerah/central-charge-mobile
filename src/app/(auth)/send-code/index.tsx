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

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export default function SendCode() {
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
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.ink0 },
  flex: { flex: 1, paddingTop: 30 },

  scroll: { flexGrow: 1, paddingBottom: 32 },

  logoWrap: { alignItems: "center", marginTop: 24, marginBottom: 28 },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.ink50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.brand400,
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },

  titleWrap: { alignItems: "center", paddingHorizontal: 28, marginBottom: 36 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: C.ink400,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },

  section: { paddingHorizontal: 28 },

  otpSection: { alignItems: "center" },
  otpHint: {
    fontSize: 13,
    color: C.ink400,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    marginBottom: 16,
  },
  otpCode: {
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  resendText: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
  },
  resendTimer: {
    fontSize: 13,
    color: C.ink300,
    fontFamily: "Inter-SemiBold",
  },
  resendLink: {
    fontSize: 13,
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});
