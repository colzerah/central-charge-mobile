import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  card: {
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 4,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: 8,
  },
  viewButton: {
    marginTop: 28,
    alignItems: "center",
    width: "100%",
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
});
