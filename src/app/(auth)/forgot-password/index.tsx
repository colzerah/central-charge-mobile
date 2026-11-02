import BackgroundGradient from "@/src/components/BackgroundGradient";
import Icon from "@/src/components/Icon";
import Input from "@/src/components/Input";
import { C } from "@/src/theme";
import { onlyDigits, PHONE_DIGITS } from "@/src/utils/phone";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import { useToast } from "@/src/hooks/useToast";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import RadiantButton from "@/src/components/RadiantButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const { openToast } = useToast();
  const [error, setError] = useState<string | null>(null);

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

  const handlePhoneSubmit = () => {
    setError(null);

    if (onlyDigits(phone).length !== PHONE_DIGITS) {
      setError("Digite um celular válido com DDD.");
      openToast({
        title: "Preencha o número de telefone.",
        subTitle: "Digite um celular válido com DDD.",
        type: "ERROR",
      });
      return;
    }

    router.push({ pathname: "/send-code", params: { phone } });
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
                <Icon
                  name="Zap"
                  color={C.brand400}
                  size={32}
                  strokeWidth={2.4}
                  fill={C.brand300}
                />
              </View>
            </Animated.View>

            <Animated.View style={[styles.titleWrap, titleStyle]}>
              <Text style={styles.title}>Esqueci minha senha</Text>
              <Text style={styles.subtitle}>
                Informe seu telefone cadastrado para receber o código de
                verificação.
              </Text>
            </Animated.View>

            <Animated.View style={[styles.section, formStyle]}>
              <View style={styles.field}>
                <Input
                  label="Celular"
                  textContentType="telephoneNumber"
                  value={phone}
                  onChange={(t) => {
                    setPhone(t);
                    setError(null);
                  }}
                  isInvalid={!!error}
                />
              </View>

              <RadiantButton
                w={"100%"}
                // isLoading={isAuthLoading}
                iconName="ArrowRight"
                rightIcon
                title="Enviar código"
                onPress={handlePhoneSubmit}
                // active={isFocused}
              />
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BackgroundGradient>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1 },
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
  field: { marginBottom: 18 },

  errorBox: {
    backgroundColor: C.error + "18",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.error + "44",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  errorText: {
    fontSize: 13,
    color: C.error,
    fontFamily: "Inter-SemiBold",
  },

  primaryBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: C.brand500,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  primaryBtnText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});
