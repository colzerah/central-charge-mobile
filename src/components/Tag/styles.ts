import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
