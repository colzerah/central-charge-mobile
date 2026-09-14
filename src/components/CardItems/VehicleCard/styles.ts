import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const vehicleStyles = StyleSheet.create({
  card: {
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    marginHorizontal: 20,
    marginTop: 20,
    overflow: "hidden",
  },
  cardImageWrap: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,10,11,0.25)",
  },
  deleteBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: C.ink0 + "99",
    alignItems: "center",
    justifyContent: "center",
  },

  cardInfo: {
    padding: 18,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  vehicleName: {
    fontSize: 20,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.3,
  },
  vehicleBrand: {
    fontSize: 14,
    fontWeight: "600",
    color: C.ink400,
    fontFamily: "Inter-SemiBold",
  },
  plateWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  plateLabel: {
    fontSize: 13,
    color: C.ink500,
    fontFamily: "Inter-Regular",
  },
  plateText: {
    fontSize: 15,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: 1.5,
  },
});
