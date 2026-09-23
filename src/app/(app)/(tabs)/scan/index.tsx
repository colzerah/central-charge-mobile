import BackgroundGradient from "@/src/components/BackgroundGradient";
import Icon from "@/src/components/Icon";
import { C } from "@/src/theme";
import { pressableOpacity } from "@/src/utils/pressable";
import { BarcodeScanningResult, CameraView, useCameraPermissions } from "expo-camera";
import { useIsFocused } from "expo-router";
import { useRef } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCAN_BOX_SIZE = 280;

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();
  const scannedRef = useRef(false);

  const handleBarcodeScanned = ({ data, type }: BarcodeScanningResult) => {
    if (scannedRef.current) return;
    scannedRef.current = true;

    Alert.alert("Código lido", `${type}: ${data}`, [
      { text: "OK", onPress: () => (scannedRef.current = false) },
    ]);
  };

  const handleRequestPermission = async () => {
    // Se o usuário negou e o sistema não permite perguntar de novo, só dá pelas configurações
    if (permission && !permission.canAskAgain) {
      Linking.openSettings();
      return;
    }

    await requestPermission();
  };

  return (
    <BackgroundGradient>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Escanear carregador</Text>
        <Text style={styles.subtitle}>
          Aponte a câmera para o QR code ou código de barras do carregador
        </Text>

        <View style={styles.scanBox}>
          {permission?.granted ? (
            <CameraView
              style={StyleSheet.absoluteFill}
              facing="back"
              active={isFocused}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39"],
              }}
              onBarcodeScanned={handleBarcodeScanned}
            />
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.permissionBox,
                { opacity: pressableOpacity(pressed) },
              ]}
              onPress={handleRequestPermission}
            >
              <Icon name="CameraOff" size={40} color={C.ink400} />
              <Text style={styles.permissionText}>
                Sem permissão para usar a câmera.
              </Text>
              <Text style={styles.permissionLink}>
                Clique aqui para dar a permissão
              </Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 22,
    color: C.white,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 28,
  },
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: C.brand400,
    overflow: "hidden",
    backgroundColor: C.ink50,
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
});
