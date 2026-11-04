import ProfileAvatar from "@/src/components/Avatar";
import BackgroundGradient from "@/src/components/BackgroundGradient";
import Badge from "@/src/components/Badge";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import RadiantButton from "@/src/components/RadiantButton";
import { useAuth } from "@/src/hooks/useAuth";
import { useModal } from "@/src/hooks/useModal";
import { useToast } from "@/src/hooks/useToast";
import { requestRegister } from "@/src/service/requests/authRequests";
import { C } from "@/src/theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function CriarConta() {
  const [name, setName] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openToast } = useToast();
  const { openModal } = useModal();
  const { signIn, isAuthLoading } = useAuth();

  const formatPhone = (text: string): string => {
    const digits = text.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validate = (): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      setNameInvalid(true);
      openToast({
        title: "Preencha o nome completo.",
        subTitle: "Nome é obrigatório.",
        type: "ERROR",
      });
      return "name";
    }

    if (!email.trim()) {
      setEmailInvalid(true);
      openToast({
        title: "Preencha o e-mail.",
        subTitle: "E-mail é obrigatório.",
        type: "ERROR",
      });
      return "email";
    }

    if (!emailRegex.test(email.trim())) {
      setEmailInvalid(true);
      openToast({
        title: "E-mail inválido.",
        subTitle: "Use um e-mail no formato válido",
        type: "ERROR",
      });
      return "email";
    }

    if (!phone.trim()) {
      setPhoneInvalid(true);
      openToast({
        title: "Preencha o telefone.",
        subTitle: "Telefone é obrigatório.",
        type: "ERROR",
      });
      return "phone";
    }

    if (phone.replace(/\D/g, "").length < 10) {
      setPhoneInvalid(true);
      openToast({
        title: "Telefone inválido.",
        subTitle: "Digite um número de telefone válido.",
        type: "ERROR",
      });
      return "phone";
    }

    if (!password.trim()) {
      setPasswordInvalid(true);
      openToast({
        title: "Preencha a senha.",
        subTitle: "Senha é obrigatória.",
        type: "ERROR",
      });
      return "password";
    }

    if (password.length < 6) {
      setPasswordInvalid(true);
      openToast({
        title: "Senha inválida.",
        subTitle: "A senha precisa ter pelo menos 6 caracteres.",
        type: "ERROR",
      });
      return "password";
    }

    return null;
  };

  const handlePressAuth = async () => {
    await signIn({ login: email, password: password });
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const validationError = validate();
      if (validationError) {
        setError(validationError);
        return;
      }
      await requestRegister({
        name: name,
        email: email,
        telefone: phone,
        password: password,
      });
      console.log("Success");
      openModal({
        title: "Conta criada com sucesso",
        subTitle: "Seja Bem-Vindo ao Central Charge!",
        type: "SUCCESS",
        onPress: () => handlePressAuth(),
        titleButton: "Ok",
      });
    } catch (error: any) {
      openModal({
        title: "Erro ao criar conta",
        subTitle: error.response.data.message,
        type: "ERROR",
      });
      console.log("Error", error.response.data.message);
    } finally {
      setLoading(false);
    }
    // router.navigate("/login");
  };

  return (
    <BackgroundGradient>
      <KeyboardAwareScrollView
        style={styles.flex}
        contentContainerStyle={styles.keyboardAwareScrollView}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={20}
      >
        <View style={styles.photoView}>
          <View>
            <ProfileAvatar
              name="profile"
              size="md"
              icon="Camera"
              iconSize={24}
              iconColor={C.ink400}
              palette={[C.ink300, C.ink200]}
            />
            <View style={styles.badge}>
              <Badge icon="Camera" />
            </View>
          </View>
          <Text style={styles.photoLabel}>Foto de perfil</Text>
          <Text style={styles.photoHint}>
            Opcional — você pode adicionar depois
          </Text>
        </View>

        <View style={styles.section}>
          <Input
            label="Nome completo"
            placeholder="Seu nome completo"
            textContentType="username"
            value={name}
            onChange={(t) => {
              setName(t);
              setNameInvalid(false);
            }}
            isInvalid={nameInvalid}
          />
          <Input
            label="E-mail"
            placeholder="você@exemplo.com"
            textContentType="emailAddress"
            value={email}
            onChange={(t) => {
              setEmail(t);
              setEmailInvalid(false);
            }}
            isInvalid={emailInvalid}
          />
          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            leftIcon="Phone"
            textContentType="telephoneNumber"
            value={phone}
            onChange={(t) => {
              setPhone(formatPhone(t));
              setPhoneInvalid(false);
            }}
            keyboardType="phone-pad"
            isInvalid={phoneInvalid}
          />
          <Input
            label="Senha"
            placeholder="min 8 caracteres"
            textContentType="password"
            value={password}
            onChange={(t) => {
              setPassword(t);
              setPasswordInvalid(false);
            }}
            isInvalid={passwordInvalid}
          />
        </View>
        <View style={styles.buttonView}>
          <RadiantButton
            title="Criar Conta"
            w={"100%"}
            onPress={handleSignUp}
            isLoading={loading || isAuthLoading}
          />
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Já tem uma conta?</Text>
          <Button
            title="Entrar"
            variant="link"
            size="sm"
            w={50}
            onPress={() => router.navigate("/login")}
          />
        </View>
      </KeyboardAwareScrollView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  keyboardAwareScrollView: { flexGrow: 1, paddingBottom: 32 },
  titleView: { alignItems: "center", marginTop: 30 },
  title: {
    fontSize: 14,
    color: C.ink400,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },
  photoView: { alignItems: "center", marginVertical: 28 },
  photoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    position: "relative",
  },
  photoImg: { width: 96, height: 96, borderRadius: 48 },
  iconView: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: C.ink50,
    borderWidth: 2,
    borderColor: C.ink200,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  photoLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    marginTop: 12,
  },
  photoHint: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  section: { paddingHorizontal: 28, gap: 16 },
  buttonView: {
    marginTop: 20,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  footerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  footerText: { fontSize: 14, color: C.ink400, fontFamily: "Inter-Regular" },
});
