import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";
import { PIN } from "../MapPin/styles";

// Os pins da legenda são os mesmos do mapa, só que reduzidos
export const LEGEND_PIN_SCALE = 0.7;

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
  content: {
    width: 220,
    gap: 12,
  },
  title: {
    fontSize: 15,
    color: C.text,
    fontFamily: "Inter-Bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pinBox: {
    width: PIN.width * LEGEND_PIN_SCALE,
    height: PIN.height * LEGEND_PIN_SCALE,
  },
  pinScaled: {
    transform: [{ scale: LEGEND_PIN_SCALE }],
    transformOrigin: "top left",
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 13,
    color: C.text,
    fontFamily: "Inter-SemiBold",
  },
  rowDescription: {
    fontSize: 12,
    color: C.ink500,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
});
