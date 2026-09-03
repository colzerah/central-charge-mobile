import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const menuStyles = StyleSheet.create({
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: C.ink300,
    fontFamily: "Inter-Bold",
    paddingHorizontal: 24,

    marginBottom: 9,
    letterSpacing: 0.3,
  },
  menuGroup: {
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  menuItem: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: C.ink200 },
  menuIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    // backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconDanger: {},
  menuText: { flex: 1, marginLeft: 12 },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: C.white,
    fontFamily: "Inter-SemiBold",
  },
  menuLabelDanger: { color: C.error },
  menuSublabel: {
    fontSize: 11,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 1,
  },
});
