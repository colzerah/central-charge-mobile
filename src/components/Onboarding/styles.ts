import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 48,
    paddingHorizontal: 28,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  skipText: {
    fontSize: 15,
    color: C.ink500,
    fontFamily: "Inter-SemiBold",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
  },
  iconCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: C.ink50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: C.brand400,
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: C.ink400,
    marginTop: 12,
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "Inter-Regular",
  },
  footer: {
    paddingHorizontal: 28,
    paddingBottom: 24,
    gap: 28,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.ink200,
  },
  dotActive: {
    width: 24,
    backgroundColor: C.brand500,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
