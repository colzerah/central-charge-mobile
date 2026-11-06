import BackgroundGradient from "@/src/components/BackgroundGradient";
import Switch from "@/src/components/Switch";
import { useAppDispatch } from "@/src/redux/store";
import { C } from "@/src/theme";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <BackgroundGradient>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Switch />
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { marginHorizontal: 14, paddingBottom: 12 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 14,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
  },
});
