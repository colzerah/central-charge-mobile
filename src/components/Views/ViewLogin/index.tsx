import BackgroundGradient from "@/src/components/BackgroundGradient";
import LogoAnimated from "@/src/components/LogoAnimated";
import SocialButton from "@/src/components/SocialButton";
import { useFrameworkReady } from "@/src/hooks/useFrameworkReady";
import { usePermissions } from "@/src/hooks/usePermissions";
import { useToast } from "@/src/hooks/useToast";
import { useAppDispatch } from "@/src/redux/store";
import { router, useIsFocused } from "expo-router";
import { useEffect, useState } from "react";

import {
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    Text,
    View
} from "react-native";

import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

import Button from "@/src/components/Button";
import Divider from "@/src/components/Divider";
import Input from "@/src/components/Input";
import RadiantButton from "@/src/components/RadiantButton";
import Skeleton from "@/src/components/Skeleton";
import { useAuth } from "@/src/hooks/useAuth";
import { useOnboarding } from "@/src/hooks/useOnboarding";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function ViewLogin() {
  useFrameworkReady();

  return <LoginContent />;
}

function LoginContent() {
  const dispatch = useAppDispatch();
  const { signIn, isAuthLoading } = useAuth();
  const { localization, camera, allowLocationAccess } = usePermissions();
  const isFocused = useIsFocused();
  const { resetOnboarding } = useOnboarding();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("12345678");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const { openToast } = useToast();

  const formO = useSharedValue(0);
  const formY = useSharedValue(30);
  const socialO = useSharedValue(0);

  const { progress: keyboardProgress } = useReanimatedKeyboardAnimation();

  useEffect(() => {
    formO.value = withDelay(600, withTiming(1, { duration: 600 }));
    formY.value = withDelay(600, withTiming(0, { duration: 700 }));
    socialO.value = withDelay(850, withTiming(1, { duration: 600 }));
    getPermissions();
  }, []);

  const getPermissions = async () => {
    await localization();
    await camera();
  };

  const formStyle = useAnimatedStyle(() => ({
    opacity: formO.value,
    transform: [{ translateY: formY.value }],
  }));

  const socialStyle = useAnimatedStyle(() => ({ opacity: socialO.value }));

  const logoStyle = useAnimatedStyle(() => {
    const progress = keyboardProgress.value;

    return {
      opacity: 1 - progress,
      transform: [{ scale: 1 - progress * 0.5 }],
      marginTop: interpolate(progress, [0, 1], [0, -220], Extrapolation.CLAMP),
    };
  });

  const socialCollapseStyle = useAnimatedStyle(() => {
    const progress = keyboardProgress.value;

    return {
      opacity: 1 - progress,
      transform: [{ scale: 1 - progress * 0.5 }],
      marginBottom: interpolate(
        progress,
        [0, 1],
        [0, -130],
        Extrapolation.CLAMP,
      ),
    };
  });

  const handleLogin = async () => {
    console.log(password);
    if (!email || !password) {
      // Alert.alert(
      //   "Campos obrigatórios",
      //   "Preencha e-mail e senha para entrar.",
      // );
      openToast({
        title: "Campos Obrigatórios",
        subTitle: "Preencha e-mail e senha para entrar.",
        type: "ERROR",
      });
      if (!email) setEmailInvalid(true);

      if (!password) setPasswordInvalid(true);

      return;
    }

    if (!allowLocationAccess) {
      Alert.alert(
        "Permissoes Obrigatorias",
        "Para poder continaur acessar o apicativo aceita as permissoes de coordenadas",
        [
          { text: "Agora não", style: "cancel" },
          {
            text: "Abrir configurações",
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      //continuar isso aqui verificar novamente se a perissao foi concedida e continuar o login
      return;
    }

    await signIn({ login: email, password: password });
  };

  const handleSocial = (p: string) => {
    signIn({ login: p, password: "social" });
    Alert.alert("Login social", `Entrar com ${p}`);
  };

  return (
    <BackgroundGradient>
      <View style={styles.root}>
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
              {/* Logo animado */}
              <Animated.View style={logoStyle}>
                <View
                  style={{
                    marginTop: 44,
                    marginBottom: 16,
                    height: 220,
                    alignItems: "center",
                  }}
                >
                  {isAuthLoading ? (
                    <Skeleton isLoading styles={{ width: 240, height: 220 }}>
                      <View />
                    </Skeleton>
                  ) : (
                    <LogoAnimated />
                  )}
                </View>
              </Animated.View>

              {/* Formulário */}
              <Animated.View style={[styles.section, formStyle]}>
                <Skeleton
                  isLoading={isAuthLoading}
                  styles={{ marginBottom: 14 }}
                >
                  <Input
                    label="E-mail"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={email}
                    onChange={(t) => {
                      setEmail(t);
                      setEmailInvalid(false);
                    }}
                    isInvalid={emailInvalid}
                  />
                </Skeleton>
                <Skeleton isLoading={isAuthLoading}>
                  <Input
                    label="Senha"
                    textContentType="password"
                    value={password}
                    onChange={(t) => {
                      setPassword(t);
                      setPasswordInvalid(false);
                    }}
                    isInvalid={passwordInvalid}
                  />
                </Skeleton>

                <View style={styles.forgotWrap}>
                  <Skeleton isLoading={isAuthLoading}>
                    <Button
                      w={160}
                      title="Esqueci minha senha"
                      variant="link"
                      size="sm"
                      onPress={() => {
                        router.navigate("/forgot-password");
                      }}
                    />
                  </Skeleton>
                </View>

                <RadiantButton
                  w={"100%"}
                  isLoading={isAuthLoading}
                  iconName="ArrowRight"
                  rightIcon
                  title="Entrar"
                  onPress={handleLogin}
                  active={isFocused}
                />
              </Animated.View>

              {/* Divisor */}
              <Animated.View style={[styles.section, socialStyle]}>
                <Animated.View style={socialCollapseStyle}>
                  <View style={{ marginTop: 22, marginBottom: 22 }}>
                    <Skeleton isLoading={isAuthLoading}>
                      <Divider title="ou continue com" />
                    </Skeleton>
                  </View>
                  <View style={styles.socialRow}>
                    <Skeleton isLoading={isAuthLoading}>
                      <SocialButton
                        type="chrome"
                        label="Google"
                        onPress={() => router.navigate("/testeImp")}
                      />
                    </Skeleton>
                    <Skeleton isLoading={isAuthLoading}>
                      <SocialButton
                        type="apple"
                        label="Apple"
                        onPress={() => router.navigate("/testeCol")}
                      />
                    </Skeleton>
                    <Skeleton isLoading={isAuthLoading}>
                      <SocialButton
                        type="facebook"
                        label="Facebook"
                        onPress={() => resetOnboarding()}
                      />
                    </Skeleton>
                  </View>
                </Animated.View>
                <View style={{ marginTop: 18, alignItems: "center" }}>
                  <Skeleton
                    isLoading={isAuthLoading}
                    styles={{
                      flex: 1,
                      flexDirection: "row",

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.footer}>
                      <Text style={styles.footerText}>
                        Ainda não tem conta?
                      </Text>
                      <Button
                        title="Criar conta"
                        variant="link"
                        size="sm"
                        w={90}
                        onPress={() => router.navigate("./criarConta")}
                      />
                    </View>
                  </Skeleton>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </BackgroundGradient>
  );
}
