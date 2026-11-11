import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: C.ink0,
  },

  sheetButton: {
    position: "absolute",
    right: 10,
    bottom: 130,
    // shadowColor: C.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 4,
  },
});
