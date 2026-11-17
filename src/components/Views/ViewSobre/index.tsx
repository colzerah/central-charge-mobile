import { APP_NAME, APP_PLATFORM, APP_VERSION } from "@/src/utils/appInfo";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

const INFO = [
  { label: "Versão", value: APP_VERSION },
  { label: "Plataforma", value: APP_PLATFORM },
];

export default function ViewSobre() {
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
          <Text style={styles.versionBadgeText}>Versão {APP_VERSION}</Text>
        </View>
        <Text style={styles.description}>
          Encontre estações de recarga perto de você, acompanhe suas recargas e
          gerencie seus veículos elétricos em um só lugar.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Informações</Text>
      <View style={styles.group}>
        {INFO.map((item, idx) => (
          <View
            key={item.label}
            style={[styles.row, idx < INFO.length - 1 && styles.rowBorder]}
          >
            <Text style={styles.rowLabel}>{item.label}</Text>
            <Text style={styles.rowValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        © {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.
      </Text>
    </ScrollView>
  );
}
