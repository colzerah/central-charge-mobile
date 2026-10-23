import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import Icon from "@/src/components/Icon";
import Input from "@/src/components/Input";
import RadiantButton from "@/src/components/RadiantButton";
import { useToast } from "@/src/hooks/useToast";
import { C } from "@/src/theme";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
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
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { openToast } = useToast();

  const formatPhone = (text: string): string => {
    const digits = text.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validate = (): string | null => {
    if (!name.trim()) {
      openToast({
        title: "Digite seu nome completo",
        type: "ERROR",
      });
      setNameInvalid(true);
    }
    if (!email.trim()) {
      openToast({
        title: "Digite seu e-mail.",
        type: "ERROR",
      });
      setEmailInvalid(true);
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      openToast({
        title: "Digite um e-mail válido.",
        type: "ERROR",
      });
      setEmailInvalid(true);
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      openToast({
        title: "Digite um telefone válido.",
        type: "ERROR",
      });
      setPhoneInvalid(true);
    }
    if (!password) {
      openToast({
        title: "Digite sua senha.",
        type: "ERROR",
      });
      setPasswordInvalid(true);
    }
    if (password.length < 6) {
      openToast({
        title: "A senha deve ter no mínimo 6 caracteres.",
        type: "ERROR",
      });
      setPasswordInvalid(true);
    }
    return null;
  };

  const handleSignUp = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    // router.navigate("/login");
  };

  const selectPhoto = async (source: "camera" | "library") => {
    try {
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ["images"],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.8,
            });

      if (!result.canceled) {
        setPhotoUrl(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Não foi possível selecionar a foto de perfil.", error);
      Alert.alert(
        "Erro",
        "Não foi possível selecionar a foto. Tente novamente.",
      );
    }
  };

  const handlePhotoPress = async () => {
    try {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!cameraPermission.granted || !libraryPermission.granted) {
        Alert.alert(
          "Permissões necessárias",
          "Permita o acesso à câmera e às fotos para adicionar uma foto de perfil.",
        );
        return;
      }
    } catch (error) {
      console.error(
        "Não foi possível solicitar acesso à câmera e às fotos.",
        error,
      );
      Alert.alert(
        "Erro",
        "Não foi possível solicitar as permissões. Tente novamente.",
      );
      return;
    }

    Alert.alert("Foto de perfil", "Como deseja adicionar sua foto?", [
      { text: "Tirar foto", onPress: () => void selectPhoto("camera") },
      {
        text: "Escolher da galeria",
        onPress: () => void selectPhoto("library"),
      },
      { text: "Cancelar", style: "cancel" },
    ]);
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
        <View style={styles.titleView}>
          <Text style={styles.title}>
            Cadastre-se para encontrar recargas perto de você
          </Text>
        </View>

        <View style={styles.photoView}>
          <Pressable style={styles.photoCircle} onPress={handlePhotoPress}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={styles.photoImg} />
            ) : (
              <View style={styles.iconView}>
                <Icon
                  name="Camera"
                  color={C.ink400}
                  size={24}
                  strokeWidth={2}
                />
              </View>
            )}
            <View style={styles.badge}>
              <Icon name="Camera" color={C.white} size={13} strokeWidth={2.4} />
            </View>
          </Pressable>
          <Text style={styles.photoLabel}>Foto de perfil</Text>
          <Text style={styles.photoHint}>
            Opcional — você pode adicionar depois
          </Text>
        </View>

        <View style={styles.section}>
          <Input
            label="Nome completo"
            placeholder="Seu nome completo"
            leftIcon="User"
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
            placeholder="min 6 caracteres"
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
    bottom: 2,
    right: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.brand500,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: C.ink0,
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
