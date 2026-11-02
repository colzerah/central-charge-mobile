import { StyleSheet } from "react-native";

import { C } from "@/src/theme";

export const defaultTheme = {
  background: C.brand500,
  backgroundSubtle: C.brand500,
  foreground: C.white,
  highlight: C.brand700,
  highlightSubtle: C.brand300,
};

// export const defaultTheme2 = {
//   background: C.brand500,
//   backgroundSubtle: C.brand700,
//   foreground: C.white,
//   highlight: C.brand400,
//   highlightSubtle: C.brand300,
// };

export const disabledTheme = {
  background: C.disabled500,
  backgroundSubtle: C.disabled600,
  foreground: C.white,
  highlight: C.disabled400,
  highlightSubtle: C.disabled500,
};

export const shadowStyle = {
  borderRadius: 14,
  boxShadow: `0px 6px 14px ${C.brand500}66`,
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
