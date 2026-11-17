import RadioList from "@/src/components/RadioList";
import {
  useChangeLanguage,
  useTranslation,
} from "@/src/hooks/useTranslation";
import { getLanguages } from "@/src/utils/enum";
import { ScrollView, Text } from "react-native";
import { styles } from "./styles";

export default function ViewIdioma() {
  const { t, language } = useTranslation();
  const changeLanguage = useChangeLanguage();

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.subtitle}>{t("language.description") /* pt: "Escolha o idioma em que o aplicativo será exibido." */}</Text>
      <RadioList
        options={getLanguages(t)}
        value={language}
        onChange={changeLanguage}
      />
    </ScrollView>
  );
}
