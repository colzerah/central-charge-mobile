import Button from "@/src/components/Button";
import RadioList from "@/src/components/RadioList";
import TextArea from "@/src/components/TextArea";
import { AppProblemType, AppReportPayload } from "@/src/dtos/reportProblemDTO";
import { APP_PLATFORM, APP_VERSION } from "@/src/utils/appInfo";
import { APP_PROBLEM_TYPES } from "@/src/utils/enum";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";

const DESCRIPTION_MAX = 500;
const DESCRIPTION_MIN = 10;

// Ainda não existe endpoint na API para isso. Quando existir, trocar o
// console.log pela chamada do request (src/service/requests).
async function sendAppReport(payload: AppReportPayload) {
  console.log("[ReportarProblema] sendAppReport", payload);
}

export default function ViewReportarProblema() {
  const [type, setType] = useState<AppProblemType | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!type) {
      setError("Selecione o tipo de problema.");
      return;
    }
    if (description.trim().length < DESCRIPTION_MIN) {
      setError(
        `Descreva o problema com pelo menos ${DESCRIPTION_MIN} caracteres.`,
      );
      return;
    }

    setError("");
    await sendAppReport({
      type,
      description: description.trim(),
      appVersion: APP_VERSION,
      platform: APP_PLATFORM,
    });
  };

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
        <Text style={styles.subtitle}>
          Encontrou um erro ou algo não funcionou como esperado? Conte para a
          gente o que aconteceu.
        </Text>

        <View style={styles.formCard}>
          <RadioList
            label="O que aconteceu?"
            options={APP_PROBLEM_TYPES}
            value={type}
            onChange={setType}
          />
          <TextArea
            label="Descrição"
            placeholder="O que você estava fazendo quando o problema aconteceu?"
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={setDescription}
          />
        </View>

        <Text style={styles.deviceInfo}>
          Versão {APP_VERSION} · {APP_PLATFORM} será enviada junto para ajudar
          a investigar.
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.submit}>
          <Button
            title="Enviar"
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
