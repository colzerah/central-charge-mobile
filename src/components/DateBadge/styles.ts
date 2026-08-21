import { StyleSheet } from "react-native";
import { C } from "~/theme";

export const styles = StyleSheet.create({
  dateBox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 42,
  },
  dateDay: {
    fontSize: 13,
    fontWeight: "700",
    color: C.ink300,
    fontFamily: "Inter-Bold",
    lineHeight: 15,
  },
  dateMonth: {
    fontSize: 8,
    fontWeight: "600",
    color: C.ink500,
    fontFamily: "Inter-SemiBold",
    lineHeight: 10,
  },
});
