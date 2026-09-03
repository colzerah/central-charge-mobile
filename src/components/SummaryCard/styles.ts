import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  summaryCard: {
    width: 120,
    height: 120,
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 14,
    alignItems: "center",
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  summaryLabel: {
    fontSize: 10,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
    textAlign: "center",
  },
});
