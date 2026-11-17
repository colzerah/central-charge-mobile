import { useTranslation } from "@/src/hooks/useTranslation";
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
    Text,
    View,
} from "react-native";
import { newVehicleStyles } from "./styles";

export default function ViewNovoVeiculo() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim() || !brand.trim() || !plate.trim()) {
      setError(t("newVehicle.fillAll") /* pt: "Preencha todos os campos para continuar." */);
      return;
    }

    setError("");
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={newVehicleStyles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={newVehicleStyles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={newVehicleStyles.introIcon}>
          <Car color={C.brand300} size={30} strokeWidth={2} />
        </View>

        <Text style={newVehicleStyles.title}>{t("newVehicle.title") /* pt: "Cadastre seu veículo" */}</Text>
        <Text style={newVehicleStyles.subtitle}>
          {t("newVehicle.subtitle") /* pt: "Adicione os dados do seu carro para encontrar recargas compatíveis com mais facilidade." */}
        </Text>

        <View style={newVehicleStyles.formCard}>
          <Input
            label={t("newVehicle.name") /* pt: "Nome do veículo" */}
            placeholder={t("newVehicle.namePlaceholder") /* pt: "Ex.: Dolphin Mini" */}
            variant="outline"
            leftIcon="Car"
            iconColor={C.ink400}
            iconBg={C.ink0}
          />
          <Input
            label={t("newVehicle.brand") /* pt: "Marca" */}
            placeholder={t("newVehicle.brandPlaceholder") /* pt: "Ex.: BYD" */}
            variant="outline"
            leftIcon="Tag"
            iconColor={C.ink400}
            iconBg={C.ink0}
          />
          <Input
            label={t("newVehicle.plate") /* pt: "Placa" */}
            placeholder={t("newVehicle.platePlaceholder") /* pt: "Ex.: ABC1D23" */}
            variant="outline"
            leftIcon="Hash"
            iconColor={C.ink400}
            iconBg={C.ink0}
          />
        </View>

        {error ? <Text style={newVehicleStyles.errorText}>{error}</Text> : null}

        <View style={{ marginTop: 24 }}>
          <Button
            title={t("newVehicle.save") /* pt: "Salvar veículo" */}
            onPress={handleSave}
            w={360}
            iconLeft="Check"
            size="md"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
