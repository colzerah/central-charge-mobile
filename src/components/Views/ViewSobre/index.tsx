import { useTranslation } from "@/src/hooks/useTranslation";
import { APP_NAME, APP_PLATFORM, APP_VERSION } from "@/src/utils/appInfo";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

export default function ViewSobre() {
  const { t } = useTranslation();

  const info = [
    { label: t("about.version") /* pt: "Versão" */, value: APP_VERSION },
    { label: t("about.platform") /* pt: "Plataforma" */, value: APP_PLATFORM },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Image
          source={require("@/assets/images/splash-logo.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <Text style={styles.appName}>{APP_NAME}</Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionBadgeText}>
            {t("common.version", { version: APP_VERSION }) /* pt: "Versão {{version}}" */}
          </Text>
        </View>
        <Text style={styles.description}>{t("about.description") /* pt: "Encontre estações de recarga perto de você, acompanhe suas recargas e gerencie seus veículos elétricos em um só lugar." */}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t("about.info") /* pt: "Informações" */}</Text>
      <View style={styles.group}>
        {info.map((item, idx) => (
          <View
            key={item.label}
            style={[styles.row, idx < info.length - 1 && styles.rowBorder]}
          >
            <Text style={styles.rowLabel}>{item.label}</Text>
            <Text style={styles.rowValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} {APP_NAME}. {t("about.rights") /* pt: "Todos os direitos reservados." */}
      </Text>
    </ScrollView>
  );
}
