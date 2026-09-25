import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { C } from "@/src/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ScanCodeScreen() {
  return (
    <BackgroundGradient>
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
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: C.white,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
    textAlign: "center",
  },

  inputView: {
    width: "100%",
    marginTop: 20,
  },
  permissionBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  permissionText: {
    fontSize: 14,
    color: C.ink300,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  permissionLink: {
    fontSize: 14,
    color: C.brand400,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
  buttonView: {
    marginTop: 80,
  },
});
