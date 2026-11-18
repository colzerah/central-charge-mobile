import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useModal } from "@/src/hooks/useModal";
import { router } from "expo-router";
import { Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
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
import { makeStyles } from "./styles";

export default function ViewNewPassword() {
  const { colors: C } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { openToast } = useToast();
  const { openModal } = useModal();
  const { t } = useTranslation();
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
    if (!password) return t("newPassword.enterNew") /* pt: "Digite sua nova senha." */;
    if (password.length < 6) return t("newPassword.minLength") /* pt: "A senha deve ter pelo menos 6 caracteres." */;
    if (password !== confirm) return t("newPassword.mismatch") /* pt: "As senhas não coincidem." */;
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      openToast({
        title: t("newPassword.errorTitle") /* pt: "Erro ao preencher as senhas" */,
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
      title: t("newPassword.successTitle") /* pt: "Senha alterada!" */,
      subTitle: t("newPassword.successMessage") /* pt: "Sua senha foi atualizada com sucesso. Agora você pode entrar no aplicativo." */,
      type: "SUCCESS",
      titleButton: t("common.ok") /* pt: "OK" */,
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
              <Text style={styles.title}>{t("newPassword.title") /* pt: "Nova senha" */}</Text>
              <Text style={styles.subtitle}>
                {t("newPassword.subtitle") /* pt: "Defina uma nova senha para acessar sua conta VoltCharge." */}
              </Text>
            </Animated.View>

            <Animated.View style={[styles.section, formStyle]}>
              <View style={styles.field}>
                <Input
                  label={t("newPassword.newPassword") /* pt: "Nova senha" */}
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
                  label={t("newPassword.confirmPassword") /* pt: "Confirmar senha" */}
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
                title={t("newPassword.save") /* pt: "Salvar nova senha" */}
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
