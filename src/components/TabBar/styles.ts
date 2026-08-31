import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

const SPACING = 10;

export const tabStyles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: C.tabBackgroud,
    borderWidth: 1.2,
    borderColor: C.ink200,
    borderRadius: 50,
    paddingVertical: 15,
    maxWidth: 240,
    paddingHorizontal: SPACING * 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  container: {
    position: "absolute",
    bottom: 30,
    left: "22%",
    // paddingBottom: 20,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButtonContainer: {
    position: "absolute",
    left: -SPACING / 2 - 50,
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 25,
    // borderWidth: 0.4,
    borderWidth: 0.4,
    backgroundColor: C.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: C.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});
