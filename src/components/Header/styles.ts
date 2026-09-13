import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  header: {
    position: "relative",
    backgroundColor: C.ink50,
    borderBottomWidth: 1,
    borderBottomColor: C.ink200,
    paddingBottom: 16,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: C.ink100,
    borderWidth: 1.5,
    borderColor: C.ink200,
    alignItems: "center",
    justifyContent: "center",
  },
  titleWrap: {
    flex: 1,
    alignItems: "center",
    marginLeft: -42,
    marginRight: -42,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  rightSlot: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  rightPlaceholder: {
    width: 42,
    height: 42,
  },
});
