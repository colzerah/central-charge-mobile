import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const dividerStyles = StyleSheet.create({
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerColumn: {
    flexDirection: "column",
  },
  dividerVertical: {
    width: 1,
    backgroundColor: C.ink200,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: C.ink200,
  },
  dividerText: {
    fontSize: 12,
    color: C.ink400,
    marginHorizontal: 12,
    fontWeight: "500",
    fontFamily: "Inter-SemiBold",
  },
});
