import { useTranslation } from "@/src/hooks/useTranslation";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function ViewScanCode() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t("scanCode.description") /* pt: "Informe o código do plug para iniciar a recarga" */}
      </Text>

      <View style={styles.inputView}>
        <Input
          label={t("scanCode.label") /* pt: "Código do plug fixado no carregador" */}
          w={"100%"}
          isFocused
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title={t("common.ok") /* pt: "OK" */}
          w={320}
          onPress={() => console.log("fazer a logica do qr code")}
        />
      </View>
    </View>
  );
}
