import BackgroundGradient from "@/src/components/BackgroundGradient";
import LogoAnimated from "@/src/components/LogoAnimated";
import SocialButton from "@/src/components/SocialButton";
import { useFrameworkReady } from "@/src/hooks/useFrameworkReady";
import { usePermissions } from "@/src/hooks/usePermissions";
import { useAppDispatch } from "@/src/redux/store";
import { C } from "@/src/theme";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
import { login } from "@/src/redux/authSlice";
import { useReanimatedKeyboardAnimation } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  useFrameworkReady();

  return <LoginContent />;
}

function LoginContent() {
  const dispatch = useAppDispatch();
  const { localization, allowLocationAccess } = usePermissions();

  const [email, setEmail] = useState("charge@gmail.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);

  const formO = useSharedValue(0);
  const formY = useSharedValue(30);
  const socialO = useSharedValue(0);

  const { progress: keyboardProgress } = useReanimatedKeyboardAnimation();

  useEffect(() => {
    console.log("CAIU");
    formO.value = withDelay(600, withTiming(1, { duration: 600 }));
    formY.value = withDelay(600, withTiming(0, { duration: 700 }));
    socialO.value = withDelay(850, withTiming(1, { duration: 600 }));
    getPermissions();
  }, []);

  const getPermissions = () => {
    localization();
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
    console.log("CAIU2");
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

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha e-mail e senha para entrar.",
      );
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

    setLoading(true);

    setTimeout(() => {
      dispatch(login());
      router.replace("/home");
      setLoading(false);
    }, 1000);
  };

  const handleSocial = (p: string) =>
    Alert.alert("Login social", `Entrar com ${p}`);

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
                  {loading ? (
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
                <Skeleton isLoading={loading} styles={{ marginBottom: 14 }}>
                  <Input
                    label="E-mail"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    value={email}
                    onChange={setEmail}
                  />
                </Skeleton>
                <Skeleton isLoading={loading}>
                  <Input
                    label="Senha"
                    textContentType="password"
                    value={password}
                    onChange={setPassword}
                  />
                </Skeleton>

                <View style={styles.forgotWrap}>
                  <Skeleton isLoading={loading}>
                    <Button
                      title="Esqueci minha senha"
                      variant="link"
                      size="sm"
                      w={150}
                      onPress={() => {
                        router.navigate("/home");
                      }}
                    />
                  </Skeleton>
                </View>

                <RadiantButton
                  w={"100%"}
                  isLoading={loading}
                  iconName="ArrowRight"
                  rightIcon
                  title="Entrar"
                  onPress={handleLogin}
                />
              </Animated.View>

              {/* Divisor */}
              <Animated.View style={[styles.section, socialStyle]}>
                <Animated.View style={socialCollapseStyle}>
                  <View style={{ marginTop: 22, marginBottom: 22 }}>
                    <Skeleton isLoading={loading}>
                      <Divider title="ou continue com" />
                    </Skeleton>
                  </View>
                  <View style={styles.socialRow}>
                    <Skeleton isLoading={loading}>
                      <SocialButton
                        type="chrome"
                        label="Google"
                        onPress={() => router.navigate("/testeImp")}
                      />
                    </Skeleton>
                    <Skeleton isLoading={loading}>
                      <SocialButton
                        type="apple"
                        label="Apple"
                        onPress={() => router.navigate("/testeCol")}
                      />
                    </Skeleton>
                    <Skeleton isLoading={loading}>
                      <SocialButton
                        type="facebook"
                        label="Facebook"
                        onPress={() => handleSocial("Facebook")}
                      />
                    </Skeleton>
                  </View>
                </Animated.View>
                <View style={{ marginTop: 18, alignItems: "center" }}>
                  <Skeleton
                    isLoading={loading}
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
                        w={84}
                        onPress={() =>
                          Alert.alert("Cadastro", "Tela de cadastro")
                        }
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent",
  },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  logoWrap: {
    alignItems: "center",
    marginTop: 56,
    marginBottom: 36,
  },
  logoContainer: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: C.brand500,
  },
  ring: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: C.brand400,
  },
  chargeRing: {
    position: "absolute",
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopColor: C.brand300,
    borderRightColor: C.brand400,
  },
  chargeDot: {
    position: "absolute",
    top: -4,
    left: 60,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.brand300,
  },
  bolt: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: C.ink50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 10,
  },
  titleWrap: {
    alignItems: "center",
    marginTop: 22,
  },
  brand: {
    fontSize: 30,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: C.ink400,
    marginTop: 6,
    fontFamily: "Inter-Regular",
  },
  section: {
    paddingHorizontal: 28,
  },
  field: {
    marginBottom: 14,
  },
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
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: C.white,
    fontFamily: "Inter-Regular",
    height: "100%",
  },
  eyeBtn: {
    paddingHorizontal: 4,
  },
  forgotWrap: {
    marginBottom: 16,
    marginTop: 16,
    alignItems: "flex-end",
  },
  forgot: {
    fontSize: 13,
    color: C.brand400,
    fontWeight: "600",
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: C.ink200,
  },
  dividerText: {
    fontSize: 12,
    color: C.ink400,
    marginHorizontal: 12,
    fontWeight: "500",
    fontFamily: "Inter-SemiBold",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    backgroundColor: C.ink50,
    borderWidth: 1.5,
    borderColor: C.ink200,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  socialLabel: {
    fontSize: 13,
    color: C.ink300,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
  },
  footerLink: {
    fontSize: 14,
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});
