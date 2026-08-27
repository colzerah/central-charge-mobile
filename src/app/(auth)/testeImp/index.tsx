import Button from "@/src/components/Button";
import ButtonIcon from "@/src/components/ButtonIcon";
import DateBadge from "@/src/components/DateBadge";
import IconBackground from "@/src/components/IconBackground";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.root}>
      <Button title="Teste" iconLeft="ArrowLeft" />
      <ButtonIcon icon="Album" size="md" variant="solid" />
      <DateBadge day={14} month="Abril" />
      <IconBackground
        icon="Plane"
        backgroundColor="red"
        size="sm"
        iconColor="red"
      />
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
