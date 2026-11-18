import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { useTranslation } from "@/src/hooks/useTranslation";
import Button from "@/src/components/Button";
import Icon from "@/src/components/Icon";
import { pressableOpacity } from "@/src/utils/pressable";
import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import * as Device from "expo-device";
import { router, useIsFocused } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BackgroundGradient from "../../BackgroundGradient";
import { makeScanStyles } from "./styles";

// Tempo para o preview mostrar o primeiro frame depois do onCameraReady
const PREVIEW_DELAY_MS = 400;
// O simulador do iOS não tem câmera: o preview fica preto para sempre
const IS_IOS_SIMULATOR = Platform.OS === "ios" && !Device.isDevice;

export default function ViewScan() {
  const { colors: C } = useTheme();
  const scanStyles = useThemedStyles(makeScanStyles);
  const [permission, requestPermission] = useCameraPermissions();
  const isFocused = useIsFocused();
  const scannedRef = useRef(false);
  // A câmera nativa pinta preto enquanto não tem imagem: o onCameraReady
  // dispara quando a sessão abre, antes do primeiro frame, e ao voltar para a
  // aba o preview também passa um instante preto. Por isso a capa com o fundo
  // do tema só some um pouco depois da câmera pronta e com a tela em foco.
  const [cameraReady, setCameraReady] = useState(false);
  const coverOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!isFocused || !cameraReady || IS_IOS_SIMULATOR) {
      coverOpacity.setValue(1);
      return;
    }
    const anim = Animated.timing(coverOpacity, {
      toValue: 0,
      duration: 250,
      delay: PREVIEW_DELAY_MS,
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [isFocused, cameraReady, coverOpacity]);
  const { t } = useTranslation();

  const handleBarcodeScanned = ({ data, type }: BarcodeScanningResult) => {
    if (scannedRef.current) return;
    scannedRef.current = true;

    Alert.alert(t("scan.codeRead") /* pt: "Código lido" */, `${type}: ${data}`, [
      { text: t("common.ok") /* pt: "OK" */, onPress: () => (scannedRef.current = false) },
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
          <Text style={scanStyles.title}>{t("scan.title") /* pt: "Escanear carregador" */}</Text>
          <Text style={scanStyles.subtitle}>
            {t("scan.subtitle") /* pt: "Aponte a câmera para o QR code ou código de barras do carregador" */}
          </Text>
        </View>

        <View style={scanStyles.scanBox}>
          {permission?.granted ? (
            <>
              <CameraView
                style={StyleSheet.absoluteFill}
                facing="back"
                active={isFocused}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr", "ean13", "ean8", "code128", "code39"],
                }}
                onCameraReady={() => setCameraReady(true)}
                onBarcodeScanned={handleBarcodeScanned}
              />
              <Animated.View
                style={[scanStyles.cameraPlaceholder, { opacity: coverOpacity }]}
                pointerEvents="none"
              >
                <Icon name="Camera" size={40} color={C.ink400} />
              </Animated.View>
            </>
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
                {t("scan.noPermission") /* pt: "Sem permissão para usar a câmera." */}
              </Text>
              <Text style={scanStyles.permissionLink}>
                {t("scan.grantPermission") /* pt: "Clique aqui para dar a permissão" */}
              </Text>
            </Pressable>
          )}
          {/* Borda desenhada por cima: se ficar no próprio container, o preview
              nativo da câmera cobre parte dela e ela fica desigual. */}
          <View style={scanStyles.scanBoxBorder} pointerEvents="none" />
        </View>
        <View style={scanStyles.buttonView}>
          <Button
            title={t("scan.typeCode") /* pt: "Digitar o Código" */}
            w={280}
            onPress={() => router.push("/scan-code")}
          />
        </View>
      </View>
    </BackgroundGradient>
  );
}
