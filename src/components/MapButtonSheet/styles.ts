import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const mapButtonSheetStyles = StyleSheet.create({
  sheet: {
    marginHorizontal: 10,
    shadowColor: C.black,
    shadowOpacity: 0.16,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  viewPlug: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    gap: 8,
  },
  viewSubTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  background: {
    backgroundColor: C.ink50,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: C.border,
  },
  content: {
    alignSelf: "stretch",
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 26,
  },
  header: {
    alignItems: "flex-end",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    width: "100%",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  tagView: {
    height: 30,
  },
  title: {
    alignSelf: "stretch",
    marginTop: 8,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "700",
    letterSpacing: -0.6,
    color: C.white,
  },
  description: {
    alignSelf: "stretch",
    marginTop: 4,
    fontSize: 15.5,
    lineHeight: 21,
    color: C.ink500,
  },

  subTitle: {
    alignSelf: "stretch",
    marginTop: 4,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 900,
    color: C.brand500,
  },
  providers: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
});
