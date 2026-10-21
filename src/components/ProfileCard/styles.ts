import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
  },
  profileInfo: { flex: 1, marginLeft: 16 },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  profileEmail: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginBottom: 2,
  },
  profileTag: {
    width: 120,
    marginTop: 2,
  },
});
