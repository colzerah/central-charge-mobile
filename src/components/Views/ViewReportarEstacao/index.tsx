import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import Button from "@/src/components/Button";
import Icon from "@/src/components/Icon";
import RadioList from "@/src/components/RadioList";
import TextArea from "@/src/components/TextArea";
import {
  StationProblemType,
  StationReportPayload,
} from "@/src/dtos/reportProblemDTO";
import { useAppSelector } from "@/src/redux/store";
import { C } from "@/src/theme";
import { useTranslation } from "@/src/hooks/useTranslation";
import { getStationProblemTypes } from "@/src/utils/enum";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { makeStyles } from "./styles";

const DESCRIPTION_MAX = 500;
const DESCRIPTION_MIN = 10;

// Ainda não existe endpoint na API para isso. Quando existir, trocar o
// console.log pela chamada do request (src/service/requests).
async function sendStationReport(payload: StationReportPayload) {
  console.log("[ReportarEstacao] sendStationReport", payload);
}

export default function ViewReportarEstacao() {
  const { colors: C } = useTheme();
  const styles = useThemedStyles(makeStyles);
  // A estação vem dos detalhes (é a mesma selecionada no mapa)
  const station = useAppSelector(
    (state) => state.appState.home.values.pinSelected,
  );
  const { t } = useTranslation();
  const [type, setType] = useState<StationProblemType | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!station) return;
    if (!type) {
      setError(t("report.selectType") /* pt: "Selecione o tipo de problema." */);
      return;
    }
    if (description.trim().length < DESCRIPTION_MIN) {
      setError(t("report.minDescription", { min: DESCRIPTION_MIN }) /* pt: "Descreva o problema com pelo menos {{min}} caracteres." */);
      return;
    }

    setError("");
    await sendStationReport({
      stationId: station.id,
      stationName: station.name,
      type,
      description: description.trim(),
    });
  };

  if (!station) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          {t("report.station.noStation") /* pt: "Nenhuma estação selecionada. Volte e escolha uma estação no mapa." */}
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.stationCard}>
          <View style={styles.stationIcon}>
            <Icon name="MapPin" color={C.brand400} size={20} />
          </View>
          <View style={styles.stationText}>
            <Text style={styles.stationName} numberOfLines={1}>
              {station.name}
            </Text>
            <Text style={styles.stationAddress} numberOfLines={2}>
              {station.adress}
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          {t("report.station.intro") /* pt: "Conte o que aconteceu nesta estação. Seu relato ajuda outros motoristas e a manter os carregadores funcionando." */}
        </Text>

        <View style={styles.formCard}>
          <RadioList
            label={t("report.station.typeLabel") /* pt: "Tipo de problema" */}
            options={getStationProblemTypes(t)}
            value={type}
            onChange={setType}
          />
          <TextArea
            label={t("report.description") /* pt: "Descrição" */}
            placeholder={t("report.station.placeholder") /* pt: "Descreva o que aconteceu..." */}
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={setDescription}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.submit}>
          <Button
            title={t("report.station.send") /* pt: "Enviar relato" */}
            onPress={handleSubmit}
            w={360}
            iconLeft="Send"
            size="md"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
