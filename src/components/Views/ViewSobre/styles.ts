import { darkColors, type ThemeColors } from "@/src/theme";
import { PixelRatio, StyleSheet } from "react-native";

// Tamanho e borda arredondados para pixels físicos: em telas com densidade
// quebrada (ex.: 2.625x) 2pt viram 5.25px e a borda fica desigual entre os lados
const LOGO_SIZE = PixelRatio.roundToNearestPixel(96);
const LOGO_BORDER = PixelRatio.roundToNearestPixel(2);
// Cor do círculo escuro do splash-logo.png (#18181B, sempre escuro)
const LOGO_BG = darkColors.ink50;

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  hero: {
    alignItems: "center",
  },
  // A borda fica num View em volta e a imagem ocupa o espaço interno. O fundo
  // tem a cor do círculo do PNG: a beirada dele é suavizada (semitransparente)
  // e, sem isso, aparecia um fio do fundo da tela entre o círculo e a borda,
  // mais fino de um lado que do outro.
  logoFrame: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    borderWidth: LOGO_BORDER,
    borderColor: C.brand400,
    backgroundColor: LOGO_BG,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: LOGO_SIZE - LOGO_BORDER * 2,
    height: LOGO_SIZE - LOGO_BORDER * 2,
  },
  appName: {
    fontSize: 22,
    color: C.text,
    fontFamily: "Inter-Bold",
    marginTop: 16,
  },
  versionBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: C.brand500 + "1A",
    borderWidth: 1,
    borderColor: C.brand500 + "40",
  },
  versionBadgeText: {
    fontSize: 12,
    color: C.brand400,
    fontFamily: "Inter-SemiBold",
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: C.ink500,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 13,
    color: C.ink300,
    fontFamily: "Inter-Bold",
    letterSpacing: 0.3,
    paddingHorizontal: 4,
    marginTop: 32,
    marginBottom: 9,
  },
  group: {
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    overflow: "hidden",
  },
  row: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.ink200,
  },
  rowLabel: {
    fontSize: 14,
    color: C.ink500,
    fontFamily: "Inter-Regular",
  },
  rowValue: {
    fontSize: 14,
    color: C.text,
    fontFamily: "Inter-SemiBold",
  },
  footer: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: 32,
  },
});
