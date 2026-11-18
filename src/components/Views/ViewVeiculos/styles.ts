import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
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
    color: C.text,
    fontFamily: "Inter-Bold",
  },
  emptySub: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
  },
});
