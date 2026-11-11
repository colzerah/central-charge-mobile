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
import { styles } from "./styles";

export default function ViewForgotPassword() {
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
  );
}
