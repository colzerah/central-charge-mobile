import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const cardInfoStyles = StyleSheet.create({
  container: {},
  content: {
    backgroundColor: C.ink100,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 14,
    height: 71,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewIcon: {
    flex: 2,
  },
  viewText: {
    flex: 10,
  },
  description: {
    fontSize: 14,
    color: C.ink300,
    fontFamily: "Inter-Regular",
    lineHeight: 19,
  },
});
