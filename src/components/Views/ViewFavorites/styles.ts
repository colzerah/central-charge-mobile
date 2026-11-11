import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
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

  filters: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.ink200,
    backgroundColor: C.ink50,
  },
  filterChipActive: {
    borderColor: C.brand400,
    backgroundColor: C.brand400 + "20",
  },
  filterText: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-SemiBold",
  },
  filterTextActive: {
    color: C.brand400,
  },

  card: {
    backgroundColor: C.ink50,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: C.brand400 + "18",
    borderWidth: 1,
    borderColor: C.brand400 + "44",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: { flex: 1, marginLeft: 12 },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  cardDistance: { fontSize: 12, color: C.ink400, fontFamily: "Inter-Regular" },
  removeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.error + "18",
    alignItems: "center",
    justifyContent: "center",
  },

  cardAddress: {
    fontSize: 12,
    color: C.ink300,
    fontFamily: "Inter-Regular",
    lineHeight: 17,
    marginBottom: 12,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardValues: {
    alignItems: "flex-end",
    gap: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: "600", fontFamily: "Inter-SemiBold" },
  cardPower: {
    fontSize: 12,
    color: C.ink300,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  cardPrice: {
    fontSize: 12,
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
  savedAt: {
    fontSize: 11,
    color: C.ink500,
    fontFamily: "Inter-Regular",
    marginTop: 10,
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
    textAlign: "center",
    marginHorizontal: 32,
  },
});
