import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1, paddingTop: 30 },

  scroll: { flexGrow: 1, paddingBottom: 32 },

  logoWrap: { alignItems: "center", marginTop: 24, marginBottom: 28 },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.ink50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.brand400,
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },

  titleWrap: { alignItems: "center", paddingHorizontal: 28, marginBottom: 36 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: C.ink400,
    marginTop: 8,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Inter-Regular",
  },

  section: { paddingHorizontal: 28 },
  field: { marginBottom: 18 },

  errorBox: {
    backgroundColor: C.error + "18",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.error + "44",
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
  },
  errorText: {
    fontSize: 13,
    color: C.error,
    fontFamily: "Inter-SemiBold",
  },

  primaryBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: C.brand500,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  primaryBtnText: {
    color: C.white,
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});
