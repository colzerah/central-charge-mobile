import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const searchBarStyles = StyleSheet.create({
  searchBar: {
    backgroundColor: C.disabled500,
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
    color: C.surface,
  },
  recentText: {
    flex: 1,
    fontSize: 15,
    color: C.white,
  },
});
