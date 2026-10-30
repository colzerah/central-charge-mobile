import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const fabGroupStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trigger: {
    backgroundColor: C.ink100,
    borderRadius: "100%",
    // shadowColor: C.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 4,
  },
});
