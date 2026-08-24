import ButtonIcon from "@/src/components/ButtonIcon";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.root}>
      <ButtonIcon icon="Star" size="md" />
      <ButtonIcon variant="outline" icon="Star" size="sm" />
      <ButtonIcon variant="solid" icon="Star" size="md" />
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
