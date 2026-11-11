import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.ink0 },
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

  otpSection: { alignItems: "center" },
  otpHint: {
    fontSize: 13,
    color: C.ink400,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    marginBottom: 16,
  },
  otpCode: {
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    fontSize: 16,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  resendText: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
  },
  resendTimer: {
    fontSize: 13,
    color: C.ink300,
    fontFamily: "Inter-SemiBold",
  },
  resendLink: {
    fontSize: 13,
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});
