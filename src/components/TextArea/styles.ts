import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
  label: {
    fontSize: 13,
    color: C.ink300,
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
    marginLeft: 2,
  },
  input: {
    minHeight: 120,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.ink0,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 15,
    color: C.text,
    fontFamily: "Inter-Regular",
    textAlignVertical: "top",
  },
  inputFocused: { borderColor: C.borderFocused },
  counter: {
    fontSize: 11,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "right",
    marginTop: 6,
  },
});
