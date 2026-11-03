import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

// O logo repete o do LogoAnimated (tela de login). O badge tem o mesmo
// tamanho e cores do assets/images/splash-logo.png (imageWidth 92 no
// app.json), para a troca da splash nativa por esta não dar salto visual.
export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: C.ink0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: C.brand500,
  },
  ring: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: C.brand400,
  },
  chargeRing: {
    position: "absolute",
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopColor: C.brand300,
    borderRightColor: C.brand400,
  },
  chargeDot: {
    position: "absolute",
    top: -4,
    left: 60,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.brand300,
  },
  badge: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: C.ink50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 24,
  },
  linesWrap: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    marginTop: 70 + 22,
    paddingHorizontal: 24,
    gap: 4,
  },
  // Altura fixa: cada linha já ocupa o espaço antes do texto entrar,
  // então nada se mexe quando as letras aparecem
  titleLine: {
    height: 40,
    alignItems: "center",
  },
  phraseLine: {
    height: 26,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.5,
  },
  phrase: {
    fontSize: 17,
    color: C.ink500,
    fontFamily: "Inter-SemiBold",
  },
});
