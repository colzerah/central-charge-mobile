import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const newehicleStyles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 24, paddingBottom: 48 },
  introIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: C.brand400 + "18",
    borderWidth: 1,
    borderColor: C.brand400 + "55",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  subtitle: {
    textAlign: "center",
    color: C.ink400,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    marginTop: 8,
    marginHorizontal: 8,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 18,
    gap: 8,
    paddingBottom: 28,
  },
  errorText: {
    color: C.error,
    fontSize: 13,
    fontFamily: "Inter-Regular",
    marginTop: 14,
    marginHorizontal: 4,
  },
});
