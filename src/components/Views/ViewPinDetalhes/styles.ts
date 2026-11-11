import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const pinDetailStyles = StyleSheet.create({
  container: { marginHorizontal: 10 },
  viewStation: { marginTop: 14 },
  viewSummary: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  viewPlug: {
    flexDirection: "row",
    gap: 12,
  },
  viewCardInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewCardInfoContent: {
    width: "80%",
  },
  viewButton: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
  },
  viewPressError: {
    marginTop: 8,
  },
  pressableError: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: C.error + "15",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: C.error + "40",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  titleError: {
    fontSize: 14,
    color: C.error,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    color: C.brand400,
    fontFamily: "Inter-Bold",
    letterSpacing: 0.5,
  },
});
