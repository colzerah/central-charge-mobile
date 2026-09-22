import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const cardPlugStyles = StyleSheet.create({
  container: {
    backgroundColor: C.ink100,
    borderColor: C.brand500,
    paddingTop: 14,
    paddingBottom: 18,
    paddingLeft: 11,
    paddingRight: 11,
    borderRadius: 18,
    width: 120,
    borderWidth: 1,
  },
  viewRowIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  titleSmall: {
    alignSelf: "center",
    fontWeight: 900,
    fontSize: 14,
    color: C.ink400,
    marginBottom: 2,
  },
  title: {
    alignSelf: "center",
    fontWeight: 900,
    fontSize: 20,
    color: C.white,
    marginBottom: 8,
  },
  body: {
    alignItems: "flex-start",
    display: "flex",
  },
  shadow: {
    backgroundColor: C.black + 90,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    borderRadius: 8,
  },
  titleKw: {
    fontWeight: 900,
    fontSize: 18,
    color: C.brand500,
    gap: 3,
  },
});
