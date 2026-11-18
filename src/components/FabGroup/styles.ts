import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeFabGroupStyles = (C: ThemeColors) =>
  StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trigger: {
    backgroundColor: C.ink100,
    borderRadius: "100%",
  },
  // No claro o botão flutua sobre o mapa: branco com sombra para se destacar
  triggerLight: {
    backgroundColor: C.ink50,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.18)",
  },
});
