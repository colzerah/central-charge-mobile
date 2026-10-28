import Button from "@/src/components/Button";
import Icon from "@/src/components/Icon";
import { C } from "@/src/theme";
import { pressableOpacity } from "@/src/utils/pressable";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router, useIsFocused } from "expo-router";
import { useRef } from "react";
import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BackgroundGradient from "../../BackgroundGradient";
import { scanStyles } from "./styles";

export default function ViewScan() {
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
      <View style={scanStyles.container}>
        <View style={scanStyles.viewTitle}>
          <Text style={scanStyles.title}>Escanear carregador</Text>
          <Text style={scanStyles.subtitle}>
            Aponte a câmera para o QR code ou código de barras do carregador
          </Text>
        </View>

        <View style={scanStyles.scanBox}>
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
                scanStyles.permissionBox,
                { opacity: pressableOpacity(pressed) },
              ]}
              onPress={handleRequestPermission}
            >
              <Icon name="CameraOff" size={40} color={C.ink400} />
              <Text style={scanStyles.permissionText}>
                Sem permissão para usar a câmera.
              </Text>
              <Text style={scanStyles.permissionLink}>
                Clique aqui para dar a permissão
              </Text>
            </Pressable>
          )}
        </View>
        <View style={scanStyles.buttonView}>
          <Button
            title="Digitar o Código"
            w={280}
            onPress={() => router.push("/scan-code")}
          />
        </View>
      </View>
    </BackgroundGradient>
  );
}
