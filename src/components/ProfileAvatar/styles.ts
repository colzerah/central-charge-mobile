import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerStyles: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyles: {
    width: 60,
    height: 60,
  },
  profileAvatar: {
    position: "absolute",
    width: 60,
    height: 60,
    // borderRadius: 32,
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
  },
});
