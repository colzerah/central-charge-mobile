import Input from "@/src/components/Input";
import { useAppDispatch } from "@/src/redux/store";

import { C } from "@/src/theme";
import { StyleSheet, View } from "react-native";

export default function TesteCol() {
  const loading = false;
  const dispatch = useAppDispatch();

  return (
    <>
      <View style={styles.root}>
        <Input label="Email" textContentType="emailAddress" />
      </View>
      <View style={styles.root}>
        <Input label="Password" textContentType="password" />
      </View>
      <View style={styles.root}>
        <Input isInvalid />
      </View>
      <View style={styles.root}>
        <Input isDisabled />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.ink0,
  },
  container: {},
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  logoWrap: {
    alignItems: "center",
    marginTop: 56,
    marginBottom: 36,
  },
  logoContainer: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: C.brand500,
  },
  ring: {
    position: "absolute",
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: C.brand400,
  },
  chargeRing: {
    position: "absolute",
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: "transparent",
    borderTopColor: C.brand300,
    borderRightColor: C.brand400,
  },
  chargeDot: {
    position: "absolute",
    top: -4,
    left: 60,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.brand300,
  },
  bolt: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: C.ink50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 10,
  },
  titleWrap: {
    alignItems: "center",
    marginTop: 22,
  },
  brand: {
    fontSize: 30,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: C.ink400,
    marginTop: 6,
    fontFamily: "Inter-Regular",
  },
  section: {
    paddingHorizontal: 28,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: C.ink300,
    marginBottom: 8,
    marginLeft: 2,
    fontFamily: "Inter-SemiBold",
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderWidth: 1.5,
    borderColor: C.ink200,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 56,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: C.white,
    fontFamily: "Inter-Regular",
    height: "100%",
  },
  eyeBtn: {
    paddingHorizontal: 4,
  },
  forgotWrap: {
    alignSelf: "flex-end",
    marginBottom: 22,
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: C.brand400,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  primaryBtn: {
    height: 56,
    paddingHorizontal: 28,
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: C.ink200,
  },
  dividerText: {
    fontSize: 12,
    color: C.ink400,
    marginHorizontal: 12,
    fontWeight: "500",
    fontFamily: "Inter-SemiBold",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  socialBtn: {
    flex: 1,
    backgroundColor: C.ink50,
    borderWidth: 1.5,
    borderColor: C.ink200,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  socialLabel: {
    fontSize: 13,
    color: C.ink300,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
  },
  footerLink: {
    fontSize: 14,
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
});
