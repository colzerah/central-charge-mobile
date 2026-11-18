import type { ThemeColors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const makeStyles = (C: ThemeColors) =>
  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 28,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    color: C.text,
    fontFamily: "Inter-Bold",
    marginBottom: 8,
    textAlign: "center",
  },

  inputView: {
    width: "100%",
    marginTop: 20,
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
    marginTop: 80,
  },
});
