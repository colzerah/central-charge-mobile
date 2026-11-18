import type { ThemeColors } from "@/src/theme";
import { PixelRatio, StyleSheet } from "react-native";

// Arredondados para pixels físicos para a borda sair igual nos quatro lados
const SCAN_BOX_SIZE = PixelRatio.roundToNearestPixel(280);
const SCAN_BOX_BORDER = PixelRatio.roundToNearestPixel(2);

export const makeScanStyles = (C: ThemeColors) =>
  StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "transparent",
  },
  viewTitle: {
    alignItems: "center",
    marginTop: 120,
  },
  title: {
    fontSize: 24,
    color: C.text,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 28,
  },
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: C.ink50,
    marginBottom: 100,
  },
  scanBoxBorder: {
    ...StyleSheet.absoluteFill,
    borderRadius: 24,
    borderWidth: SCAN_BOX_BORDER,
    borderColor: C.brand400,
  },
  cameraPlaceholder: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
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
  buttonView: {
    marginBottom: 120,
  },
});
