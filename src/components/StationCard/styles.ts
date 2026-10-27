import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 20,
  },
  viewIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { flex: 1, marginLeft: 16 },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    marginBottom: 6,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  textStatus: { fontSize: 14, fontWeight: "600", fontFamily: "Inter-SemiBold" },
});
