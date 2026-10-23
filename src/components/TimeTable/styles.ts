import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({
  menuGroup: {
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 0.2,
    borderColor: C.ink300,
    backgroundColor: C.ink100,
  },

  menuText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuLabel: {
    fontSize: 13,
    color: C.ink300,
    fontFamily: "Inter-Regular",
  },
  menuSublabel: {
    fontSize: 13,
    color: C.white,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
});
