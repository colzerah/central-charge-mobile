import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: C.ink0,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  tail: {
    width: 0,
    height: 0,
    marginTop: -1,
    // borderWidth: 16,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 30,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
});
