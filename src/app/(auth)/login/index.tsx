import LogoAnimated from "@/src/components/LogoAnimated";
import SocialButton from "@/src/components/SocialButton";
import { useFrameworkReady } from "@/src/hooks/useFrameworkReady";
import { login } from "@/src/redux/authSlice";
import { C } from "@/src/theme";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function Login() {
  useFrameworkReady();

  return <LoginContent />;
}

function LoginContent() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formO = useSharedValue(0);
  const formY = useSharedValue(30);
  const socialO = useSharedValue(0);

  useEffect(() => {
    formO.value = withDelay(600, withTiming(1, { duration: 600 }));
    formY.value = withDelay(600, withTiming(0, { duration: 700 }));
    socialO.value = withDelay(850, withTiming(1, { duration: 600 }));
  }, []);

  const formStyle = useAnimatedStyle(() => ({
    opacity: formO.value,
    transform: [{ translateY: formY.value }],
  }));

  const socialStyle = useAnimatedStyle(() => ({ opacity: socialO.value }));

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha e-mail e senha para entrar.",
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1100);

    dispatch(login());
  };

  const handleSocial = (p: string) =>
    Alert.alert("Login social", `Entrar com ${p}`);

  return (
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
            <LogoAnimated />

            {/* Formulário */}
            <Animated.View style={[styles.section, formStyle]}>
              <Field label="E-mail">
                <View style={styles.inputWrap}>
                  <Mail color={C.brand500} size={20} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="voce@exemplo.com"
                    placeholderTextColor={C.ink400}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                  />
                </View>
              </Field>

              <Field label="Senha">
                <View style={styles.inputWrap}>
                  <Lock color={C.brand500} size={20} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor={C.ink400}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    textContentType="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((s) => !s)}
                    style={styles.eyeBtn}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    {showPassword ? (
                      <EyeOff color={C.ink400} size={20} />
                    ) : (
                      <Eye color={C.ink400} size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </Field>

              <TouchableOpacity
                style={styles.forgotWrap}
                onPress={() =>
                  Alert.alert(
                    "Recuperar senha",
                    "Envio de link de recuperação.",
                  )
                }
              >
                <Text style={styles.forgot}>Esqueci minha senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleLogin}
                activeOpacity={0.85}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={C.white} />
                ) : (
                  <>
                    <Text style={styles.primaryBtnText}>Entrar</Text>
                    <ArrowRight color={C.white} size={20} strokeWidth={2.2} />
                  </>
                )}
              </TouchableOpacity>
            </Animated.View>

            {/* Divisor */}
            <Animated.View
              style={[styles.section, { marginTop: 28 }, socialStyle]}
            >
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>ou continue com</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialRow}>
                <SocialButton
                  type="chrome"
                  label="Google"
                  onPress={() => handleSocial("Google")}
                />
                <SocialButton
                  type="apple"
                  label="Apple"
                  onPress={() => handleSocial("Apple")}
                />
                <SocialButton
                  type="facebook"
                  label="Facebook"
                  onPress={() => handleSocial("Facebook")}
                />
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Ainda não tem conta? </Text>
                <TouchableOpacity
                  onPress={() => Alert.alert("Cadastro", "Tela de cadastro")}
                >
                  <Text style={styles.footerLink}>Criar conta</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.ink0,
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
    marginBottom: 18,
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
    alignSelf: "flex-end",
    marginBottom: 22,
    marginTop: 4,
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
    marginTop: 32,
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
