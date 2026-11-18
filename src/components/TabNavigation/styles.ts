import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeTabNavigationStyles = (C: ThemeColors) =>
  StyleSheet.create({
  bar: {
    backgroundColor: C.ink50,
  },
});
