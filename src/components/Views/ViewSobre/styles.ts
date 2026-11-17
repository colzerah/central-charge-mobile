import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 40,
  },
  hero: {
    alignItems: "center",
  },
  logo: {
    width: 96,
    height: 96,
  },
  appName: {
    fontSize: 22,
    color: C.white,
    fontFamily: "Inter-Bold",
    marginTop: 16,
  },
  versionBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: C.brand500 + "1A",
    borderWidth: 1,
    borderColor: C.brand500 + "40",
  },
  versionBadgeText: {
    fontSize: 12,
    color: C.brand400,
    fontFamily: "Inter-SemiBold",
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    color: C.ink500,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 13,
    color: C.ink300,
    fontFamily: "Inter-Bold",
    letterSpacing: 0.3,
    paddingHorizontal: 4,
    marginTop: 32,
    marginBottom: 9,
  },
  group: {
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    overflow: "hidden",
  },
  row: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.ink200,
  },
  rowLabel: {
    fontSize: 14,
    color: C.ink500,
    fontFamily: "Inter-Regular",
  },
  rowValue: {
    fontSize: 14,
    color: C.white,
    fontFamily: "Inter-SemiBold",
  },
  footer: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginTop: 32,
  },
});
