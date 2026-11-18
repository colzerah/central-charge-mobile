import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeSocialButtonStyles = (C: ThemeColors) =>
  StyleSheet.create({
    socialBtn: {
      backgroundColor: C.ink50,
      borderWidth: 1.5,
      borderColor: C.border,
      borderRadius: 14,
      height: 88,
      width: 110,
      paddingVertical: 14,

      alignItems: "center",
    },
    socialIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: C.ink100,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 6,
    },
    socialLabel: {
      fontSize: 13,
      color: C.ink500,
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
    },
  });
