import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import Icon from "@/src/components/Icon";
import Input from "@/src/components/Input";
import RadiantButton from "@/src/components/RadiantButton";
import { C } from "@/src/theme";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function CriarConta() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  return (
    <BackgroundGradient>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={20}
      >
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Text
            style={{
              fontSize: 14,
              color: C.ink400,
              marginTop: 8,
              textAlign: "center",
              lineHeight: 20,
              fontFamily: "Inter-Regular",
            }}
          >
            Cadastre-se para encontrar recargas perto de você
          </Text>
        </View>

        <View style={{ alignItems: "center", marginVertical: 28 }}>
          <Pressable
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              position: "relative",
            }}
            onPress={() => ""}
          >
            {photoUrl ? (
              <Image
                source={{ uri: photoUrl }}
                style={{ width: 96, height: 96, borderRadius: 48 }}
              />
            ) : (
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  backgroundColor: C.ink50,
                  borderWidth: 2,
                  borderColor: C.ink200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  name="Camera"
                  color={C.ink400}
                  size={24}
                  strokeWidth={2}
                />
              </View>
            )}
            <View
              style={{
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
              }}
            >
              <Icon
                name="Camera"
                color={C.white}
                size={13}
                strokeWidth={2.4}
              />
            </View>
          </Pressable>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: C.white,
              fontFamily: "Inter-Bold",
              marginTop: 12,
            }}
          >
            Foto de perfil
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: C.ink400,
              fontFamily: "Inter-Regular",
              marginTop: 2,
            }}
          >
            Opcional — você pode adicionar depois
          </Text>
        </View>

        <View style={{ paddingHorizontal: 28, gap: 16 }}>
          <Input
            label="Nome completo"
            placeholder="Seu nome completo"
            leftIcon="User"
          />
          <Input
            label="E-mail"
            placeholder="você@exemplo.com"
            textContentType="emailAddress"
          />
          <Input
            label="Telefone"
            placeholder="(11) 99999-9999"
            leftIcon="Phone"
          />
          <Input
            label="Senha"
            placeholder="min 6 caracteres"
            textContentType="password"
          />
        </View>
        <View
          style={{
            marginTop: 20,
            justifyContent: "center",
            paddingHorizontal: 28,
          }}
        >
          <RadiantButton title="Criar Conta" w={"100%"} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: C.ink400,
              fontFamily: "Inter-Regular",
            }}
          >
            Já tem uma conta?
          </Text>
          <Button title="Entrar" variant="link" size="sm" w={50} />
        </View>
      </KeyboardAwareScrollView>
    </BackgroundGradient>
  );
}
