import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  rechargeInfo: { flex: 1, marginLeft: 14 },
  rechargeDateInfo: { flexDirection: "row" },
  rechargeStation: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  rechargeDate: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  rechargeStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  rechargeStat: { fontSize: 12, color: C.ink300, fontFamily: "Inter-SemiBold" },
  rechargeDot: { fontSize: 12, color: C.ink400 },
  rechargeRight: { alignItems: "flex-end" },
  rechargeCost: {
    fontSize: 15,
    fontWeight: "700",
    color: C.brand400,
    fontFamily: "Inter-Bold",
    marginBottom: 6,
  },
});
