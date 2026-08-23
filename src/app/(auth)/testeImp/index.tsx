import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, Text, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.root}>
      <Text>TesteImp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
