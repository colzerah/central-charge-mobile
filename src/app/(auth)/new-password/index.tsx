import { useModal } from "@/src/hooks/useModal";
import { router } from "expo-router";
import { Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

import BackgroundGradient from "@/src/components/BackgroundGradient";
import Input from "@/src/components/Input";
import RadiantButton from "@/src/components/RadiantButton";
import { useToast } from "@/src/hooks/useToast";
import { C } from "@/src/theme";

export default function ResetPasswordScreen() {
  const { openToast } = useToast();
  const { openModal } = useModal();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
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
    titleO.value = withDelay(300, withTiming(1, { duration: 500 }));
    titleY.value = withDelay(300, withTiming(0, { duration: 600 }));
    formO.value = withDelay(500, withTiming(1, { duration: 600 }));
    formY.value = withDelay(500, withTiming(0, { duration: 700 }));
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

  const validate = (): string | null => {
    if (!password) return "Digite sua nova senha.";
    if (password.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
    if (password !== confirm) return "As senhas não coincidem.";
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      openToast({
        title: "Erro ao preencher as senhas",
        subTitle: validationError,
        type: "ERROR",
      });
      return;
    }

    setError(null);
    setLoading(true);

    // chamo aqui a request

    setLoading(false);
    openModal({
      title: "Senha alterada!",
      subTitle:
        "Sua senha foi atualizada com sucesso. Agora você pode entrar no aplicativo.",
      type: "SUCCESS",
      titleButton: "OK",
      // titleButtonCancel: "Nao",
      onPress: () => handleDone(),
    });
  };

  const handleDone = () => {
    router.replace("/");
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
                <Zap
                  color={C.brand400}
                  size={32}
                  strokeWidth={2.4}
                  fill={C.brand300}
                />
              </View>
            </Animated.View>

            <Animated.View style={[styles.titleWrap, titleStyle]}>
              <Text style={styles.title}>Nova senha</Text>
              <Text style={styles.subtitle}>
                Defina uma nova senha para acessar sua conta VoltCharge.
              </Text>
            </Animated.View>

            <Animated.View style={[styles.section, formStyle]}>
              <View style={styles.field}>
                <Input
                  label="Nova senha"
                  textContentType="password"
                  value={password}
                  onChange={(t) => {
                    setPassword(t);
                    setError(null);
                  }}
                  isInvalid={!!error}
                />
              </View>

              <View style={styles.field}>
                <Input
                  label="Confirmar senha"
                  textContentType="password"
                  value={confirm}
                  onChange={(t) => {
                    setConfirm(t);
                    setError(null);
                  }}
                  isInvalid={!!error}
                />
              </View>
              {/* 
              {error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )} */}

              <RadiantButton
                w={"100%"}
                isLoading={loading}
                iconName="ArrowRight"
                rightIcon
                title="Salvar nova senha"
                onPress={handleSubmit}
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
  flex: { flex: 1, paddingTop: 30 },

  backBar: { paddingHorizontal: 12, paddingTop: 8 },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

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
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: C.ink300,
    marginBottom: 8,
    marginLeft: 2,
    fontFamily: "Inter-SemiBold",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderWidth: 1.5,
    borderColor: C.ink200,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 56,
  },
  inputIcon: { marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 16,
    color: C.white,
    fontFamily: "Inter-Regular",
    height: "100%",
  },
  eyeBtn: { paddingHorizontal: 4 },

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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: C.ink50,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: C.ink200,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 36,
  },
  modalIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: C.success + "18",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: C.ink400,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    marginBottom: 28,
  },
  modalBtn: {
    width: "100%",
    height: 54,
    borderRadius: 14,
    backgroundColor: C.brand500,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  modalBtnText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});
