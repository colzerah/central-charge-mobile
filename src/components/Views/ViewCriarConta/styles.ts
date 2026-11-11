import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  keyboardAwareScrollView: { flexGrow: 1, paddingBottom: 32 },
  titleView: { alignItems: "center", marginTop: 30 },
  title: {
    fontSize: 14,
    color: C.ink400,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },
  photoView: { alignItems: "center", marginVertical: 28 },
  photoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    position: "relative",
  },
  photoImg: { width: 96, height: 96, borderRadius: 48 },
  iconView: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: C.ink50,
    borderWidth: 2,
    borderColor: C.ink200,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  photoLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    marginTop: 12,
  },
  photoHint: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  section: { paddingHorizontal: 28, gap: 16 },
  buttonView: {
    marginTop: 20,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  footerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
  },
  footerText: { fontSize: 14, color: C.ink400, fontFamily: "Inter-Regular" },
});
