import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },

  viewButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  emptySub: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
  },
});
