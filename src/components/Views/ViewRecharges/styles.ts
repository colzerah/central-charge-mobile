import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const rechargesStyles = StyleSheet.create({
  header: { marginHorizontal: 14, paddingBottom: 12 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 24,
    marginHorizontal: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    marginHorizontal: 14,
    marginBottom: 14,
  },
  sectionView: {
    marginHorizontal: 14,
    marginBottom: 12,
    gap: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
});
