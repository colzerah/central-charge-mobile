import Button from "@/src/components/Button";
import { VehicleCard } from "@/src/components/CardItems/VehicleCard";
import { VehicleData } from "@/src/components/CardItems/VehicleCard/VehicleCardDTO";
import Icon from "@/src/components/Icon";
import { C } from "@/src/theme";
import { INITIAL_VEHICLES } from "@/src/utils/mocks";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";

export default function ViewVeiculos() {
  const [vehicles, setVehicles] = useState<VehicleData[]>(INITIAL_VEHICLES);

  const contentO = useSharedValue(0);
  const contentY = useSharedValue(24);

  useEffect(() => {
    contentO.value = withDelay(80, withTiming(1, { duration: 500 }));
    contentY.value = withDelay(
      80,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
    );
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentO.value,
    transform: [{ translateY: contentY.value }],
  }));

  const handleDelete = (id: string) => {
    Alert.alert(
      "Excluir veículo",
      "Deseja remover este veículo da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => setVehicles((prev) => prev.filter((v) => v.id !== id)),
        },
      ],
    );
  };

  const handleAddVehicle = () => {
    router.push("/novo-veiculo");
  };

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Animated.View style={contentStyle}>
          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <View style={{ marginBottom: 24 }} key={v.id}>
                <VehicleCard vehicle={v} onDelete={() => handleDelete(v.id)} />
              </View>
            ))
          ) : (
            <View style={styles.emptyWrap}>
              <Icon name="Car" color={C.ink400} size={48} strokeWidth={1.5} />
              <Text style={styles.emptyText}>Nenhum veículo cadastrado</Text>
              <Text style={styles.emptySub}>
                Adicione seu primeiro veículo para começar
              </Text>
            </View>
          )}

          <View style={styles.viewButton}>
            <Button
              title="Novo veículo"
              onPress={handleAddVehicle}
              w={370}
              iconLeft="Plus"
              size="md"
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
