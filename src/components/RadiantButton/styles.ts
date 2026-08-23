import { StyleSheet } from "react-native";

import { C } from "@/src/theme";

export const defaultTheme = {
  background: C.brand500,
  backgroundSubtle: C.brand700,
  foreground: C.white,
  highlight: C.brand400,
  highlightSubtle: C.brand300,
};

export const disabledTheme = {
  background: C.disabled500,
  backgroundSubtle: C.disabled600,
  foreground: C.white,
  highlight: C.disabled400,
  highlightSubtle: C.disabled500,
};

export const shadowStyle = {
  shadowColor: C.brand500,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.4,
  shadowRadius: 14,
  elevation: 8,
};

export const radiantButtonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    color: C.white,
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
  button: {
    height: 56,
  },
  activityIndicator: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
});
