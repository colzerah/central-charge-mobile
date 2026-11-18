import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  subtitle: {
    color: C.ink400,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
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
  deviceInfo: {
    color: C.ink400,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: "Inter-Regular",
    marginTop: 12,
    marginHorizontal: 4,
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    fontFamily: "Inter-Regular",
    marginTop: 14,
    marginHorizontal: 4,
  },
  submit: { marginTop: 24, alignItems: "center" },
});
