import { C } from "@/src/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
  },

  swipeWrap: {
    position: "relative",
  },

  deleteBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.error,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 24,
    // height: "95%",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderBottomWidth: 1,
    borderBottomColor: C.ink200,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  cardUnread: {
    backgroundColor: C.ink100,
  },

  cardBody: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.brand400,
    shadowColor: C.brand400,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
    flexShrink: 1,
  },

  cardMessage: {
    fontSize: 12,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 4,
    lineHeight: 17,
  },

  dateBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: C.ink100,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    minWidth: 42,
  },

  dateDay: {
    fontSize: 13,
    fontWeight: "700",
    color: C.ink300,
    fontFamily: "Inter-Bold",
    lineHeight: 15,
  },

  dateMonth: {
    fontSize: 8,
    fontWeight: "600",
    color: C.ink500,
    fontFamily: "Inter-SemiBold",
    lineHeight: 10,
  },

  chevron: {
    marginLeft: 6,
  },
});
