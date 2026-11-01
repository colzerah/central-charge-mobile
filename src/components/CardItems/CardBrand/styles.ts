import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const cardInfoStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: C.ink100,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  viewIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { alignItems: "center", justifyContent: "center", gap: 8 },
  viewImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textImage: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
  textName: {
    fontSize: 13,
    fontWeight: "900",
    fontFamily: "Inter-SemiBold",
    maxWidth: "100%",
  },
  textStation: {
    fontSize: 12,
    color: C.ink500,
    fontFamily: "Inter-Regular",
  },
});
