import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { C } from "@/src/theme";
import { router } from "expo-router";
import { Car } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function NovoVeiculoScreen() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim() || !brand.trim() || !plate.trim()) {
      setError("Preencha todos os campos para continuar.");
      return;
    }

    setError("");
    router.back();
  };

  return (
    <BackgroundGradient>
      <KeyboardAvoidingView
        style={newehicleStyles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={newehicleStyles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={newehicleStyles.introIcon}>
            <Car color={C.brand300} size={30} strokeWidth={2} />
          </View>

          <Text style={newehicleStyles.title}>Cadastre seu veículo</Text>
          <Text style={newehicleStyles.subtitle}>
            Adicione os dados do seu carro para encontrar recargas compatíveis
            com mais facilidade.
          </Text>

          <View style={newehicleStyles.formCard}>
            <Input
              label="Nome do veículo"
              placeholder="Ex.: Dolphin Mini"
              variant="outline"
              leftIcon="Car"
              iconColor={C.ink400}
              iconBg={C.ink0}
            />
            <Input
              label="Marca"
              placeholder="Ex.: BYD"
              variant="outline"
              leftIcon="Tag"
              iconColor={C.ink400}
              iconBg={C.ink0}
            />
            <Input
              label="Placa"
              placeholder="Ex.: ABC1D23"
              variant="outline"
              leftIcon="Hash"
              iconColor={C.ink400}
              iconBg={C.ink0}
            />
          </View>

          {error ? (
            <Text style={newehicleStyles.errorText}>{error}</Text>
          ) : null}

          <View style={{ marginTop: 24 }}>
            <Button
              title="Salvar veículo"
              onPress={handleSave}
              w={360}
              iconLeft="Check"
              size="md"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BackgroundGradient>
  );
}

const newehicleStyles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: C.brand400 + "18",
    borderWidth: 1,
    borderColor: C.brand400 + "55",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    textAlign: "center",
    color: C.ink400,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    marginTop: 8,
    marginHorizontal: 8,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 18,
    gap: 8,
    paddingBottom: 28,
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    fontFamily: "Inter-Regular",
    marginTop: 14,
    marginHorizontal: 4,
  },
});
