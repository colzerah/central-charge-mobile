import BackgroundGradient from "@/src/components/BackgroundGradient";
import ButtonIcon from "@/src/components/ButtonIcon";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  // const handleOpen = (id: string) => {
  //   console.log("Abrindo notificação:", id);
  // };

  // const handleDelete = (id: string) => {
  //   console.log("Excluindo notificação:", id);
  // };

  return (
    <BackgroundGradient>
      <View style={styles.root}>
        <ButtonIcon icon="Star" size="sm" variant="outline" />
        <ButtonIcon icon="Star" size="md" />
      </View>
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
