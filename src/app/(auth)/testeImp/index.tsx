import BackgroundGradient from "@/src/components/BackgroundGradient";
import RechargeCard from "@/src/components/RechargeCard";
import {
  RechargeProps,
  RECHARGES_MOCK,
} from "@/src/components/Views/ViewRecharges/RechargesDTO";
import { useAppDispatch } from "@/src/redux/store";
import { C } from "@/src/theme";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";

import { StyleSheet, Text, View } from "react-native";

export default function TesteImp() {
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const renderItem = ({ item }: { item: RechargeProps }) => (
    <View style={{ marginHorizontal: 14, marginBottom: 12 }}>
      <RechargeCard {...item} />
    </View>
  );

  const emptyComponent = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: C.white, fontSize: 16 }}>
        Nenhuma Recarga encontrada
      </Text>
    </View>
  );

  return (
    <BackgroundGradient>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recargas</Text>
          <Text style={styles.headerSubtitle}>Histórico e agendamentos</Text>
        </View>
        <FlashList
          data={RECHARGES_MOCK}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={emptyComponent}
          // onEndReached={} recarregar mais dados
          // onEndReachedThreshold={0.5} quando chegar nessa altura
          // onRefresh={} função de atualizar
          // refreshing={} estado de atualização
        />
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
