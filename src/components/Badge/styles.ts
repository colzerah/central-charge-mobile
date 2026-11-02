import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  badge: {
    position: "absolute", // verificar
    bottom: 2, // verificar
    right: 2, // verificar
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.brand500,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: C.ink0,
  },
});
