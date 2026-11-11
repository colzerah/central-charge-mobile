import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function ViewScanCode() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Informe o código do plug para iniciar a recarga
      </Text>

      <View style={styles.inputView}>
        <Input
          label="Código do plug fixado no carregador"
          w={"100%"}
          isFocused
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          title="OK"
          w={320}
          onPress={() => console.log("fazer a logica do qr code")}
        />
      </View>
    </View>
  );
}
