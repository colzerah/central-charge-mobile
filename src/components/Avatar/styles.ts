import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
  containerStyles: {
    alignItems: "center",
    justifyContent: "center",
  },

  profileAvatar: {
    position: "absolute",
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
  },
});
