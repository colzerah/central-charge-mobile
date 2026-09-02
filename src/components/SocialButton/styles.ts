import { StyleSheet } from "react-native";
export const C = {
  ink0: "#0A0A0B",
  ink50: "#18181B",
  ink100: "#27272A",
  ink200: "#3F3F46",
  ink300: "#52525B",
  ink400: "#71717A",
  ink500: "#A1A1AA",
  brand300: "#FB923C",
  brand400: "#F97316",
  brand500: "#F97316",
  brand600: "#EA580C",
  white: "#FFFFFF",
};

export const styles = StyleSheet.create({
  socialBtn: {
    backgroundColor: C.ink50,
    borderWidth: 1.5,
    borderColor: C.ink200,
    borderRadius: 14,
    height: 88,
    width: 110,
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
});
