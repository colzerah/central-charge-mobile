import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: C.ink300,
    marginBottom: 8,
    marginLeft: 2,
    fontFamily: "Inter-SemiBold",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: C.white,
    fontFamily: "Inter-Regular",
    height: "100%",
  },
  eyeBtn: {
    paddingHorizontal: 4,
  },
});
