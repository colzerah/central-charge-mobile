import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  stationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 14,
  },
  stationIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.brand400 + "18",
    borderWidth: 1,
    borderColor: C.brand400 + "55",
    alignItems: "center",
    justifyContent: "center",
  },
  stationText: { flex: 1 },
  stationName: {
    fontSize: 15,
    color: C.text,
    fontFamily: "Inter-SemiBold",
  },
  stationAddress: {
    fontSize: 12,
    lineHeight: 17,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  subtitle: {
    color: C.ink400,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 4,
  },
  formCard: {
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 18,
    gap: 20,
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    fontFamily: "Inter-Regular",
    marginTop: 14,
    marginHorizontal: 4,
  },
  submit: { marginTop: 24, alignItems: "center" },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    color: C.ink400,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
});
