import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  label: {
    fontSize: 13,
    color: C.ink300,
    fontFamily: "Inter-SemiBold",
    marginBottom: 8,
    marginLeft: 2,
  },
  list: { gap: 8 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.border,
    backgroundColor: C.ink0,
  },
  optionSelected: {
    borderColor: C.brand400,
    backgroundColor: C.brand400 + "14",
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: C.ink500,
    fontFamily: "Inter-Regular",
  },
  optionTextSelected: {
    color: C.white,
    fontFamily: "Inter-SemiBold",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: C.ink300,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: { borderColor: C.brand400 },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.brand400,
  },
});
