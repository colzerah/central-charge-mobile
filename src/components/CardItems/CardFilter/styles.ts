import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const cardInfoStyles = StyleSheet.create({
  container: {
    backgroundColor: C.ink100,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.ink200,
    paddingVertical: 18,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
  },

  label: {
    fontSize: 14,
    color: C.white,
    fontFamily: "Inter-SemiBold",
    fontWeight: "bold",
  },
  count: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-SemiBold",
    fontWeight: "bold",
    backgroundColor: C.ink200,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
});
