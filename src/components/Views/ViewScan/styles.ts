import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

const SCAN_BOX_SIZE = 280;

export const scanStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "transparent",
  },
  viewTitle: {
    alignItems: "center",
    marginTop: 120,
  },
  title: {
    fontSize: 24,
    color: C.white,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginBottom: 28,
  },
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: C.brand400,
    overflow: "hidden",
    backgroundColor: C.ink50,
    marginBottom: 100,
  },
  permissionBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },
  permissionText: {
    fontSize: 14,
    color: C.ink300,
    fontFamily: "Inter-Regular",
    textAlign: "center",
  },
  permissionLink: {
    fontSize: 14,
    color: C.brand400,
    fontFamily: "Inter-SemiBold",
    textAlign: "center",
  },
  buttonView: {
    marginBottom: 120,
  },
});
