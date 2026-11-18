import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeSearchBarStyles = (C: ThemeColors) =>
  StyleSheet.create({
  searchBar: {
    backgroundColor: C.ink50,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  focusedContainer: {
    flex: 1,
  },
  focusedScroll: {
    flex: 1,
    paddingTop: 90,
  },
  focusedSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  focusedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  focusedTitle: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: C.surface,
  },
  recentText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter-Regular",
    color: C.text,
  },
});
