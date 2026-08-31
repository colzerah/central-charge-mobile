import RechargeCard from "@/src/components/RechargeCard";
import { useAppDispatch } from "@/src/redux/store";

import { StyleSheet, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.root}>
      {/* <Button title="Teste" iconLeft="ArrowLeft" size="md" variant="link" />
      <ButtonIcon icon="Album" size="md" variant="solid" />
      <DateBadge day={14} month="Abril" />
      <IconBackground icon="Plane" size="sm" /> */}
      <RechargeCard
        title="Estação Centro"
        variant="success"
        duration={38}
        kwh={24.5}
        cost={1550.5}
        tagTitle="Concluído"
      />
      <RechargeCard
        title="Estação Pocotó"
        variant="danger"
        duration={0}
        kwh={0}
        cost={0}
        tagTitle="Cancelado"
      />
      <RechargeCard
        title="Estação Aeroporto"
        variant="info"
        duration={0}
        kwh={0}
        cost={0}
        tagTitle="Agendado"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
