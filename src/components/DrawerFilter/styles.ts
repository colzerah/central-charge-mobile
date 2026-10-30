import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const drawerFilterStyles = StyleSheet.create({
  drawer: {
    backgroundColor: C.ink50,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  panel: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  viewTitle: { flexDirection: "row", alignItems: "center", gap: 14 },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  closeButton: {
    padding: 6,
    borderRadius: 99,
    backgroundColor: C.ink100,
  },
  content: {
    paddingVertical: 16,
    gap: 16,
  },
  footer: {
    alignItems: "center",
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
});
