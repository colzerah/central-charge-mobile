import MenuList from "@/src/components/MenuList";
import MenuStatCard from "@/src/components/MenuStatCard";
import ProfileCard from "@/src/components/ProfileCard";
import { useAuth } from "@/src/hooks/useAuth";
import { useModal } from "@/src/hooks/useModal";
import { useAppDispatch } from "@/src/redux/store";
import { MENU_CONTA, MENU_PREFERENCIA, MENU_SUPORTE } from "@/src/utils/enum";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function ViewMenu() {
  const dispatch = useAppDispatch();
  const { signOut } = useAuth();
  const { openModal } = useModal();
  const profileO = useSharedValue(0);
  const profileY = useSharedValue(20);
  const menuO = useSharedValue(0);
  const menuY = useSharedValue(24);

  useEffect(() => {
    profileO.value = withDelay(100, withTiming(1, { duration: 500 }));
    profileY.value = withDelay(
      100,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
    );
    menuO.value = withDelay(300, withTiming(1, { duration: 500 }));
    menuY.value = withDelay(
      300,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
    );
  }, []);

  const profileStyle = useAnimatedStyle(() => ({
    opacity: profileO.value,
    transform: [{ translateY: profileY.value }],
  }));

  const menuStyle = useAnimatedStyle(() => ({
    opacity: menuO.value,
    transform: [{ translateY: menuY.value }],
    marginTop: 25,
    gap: 25,
  }));

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>
        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Perfil */}
          <Animated.View style={profileStyle}>
            <ProfileCard name="Ruan Belmiro" email="ruan@teste.com" premium />
          </Animated.View>

          {/* Estatísticas */}
          <Animated.View style={profileStyle}>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 12,
              }}
            >
              <MenuStatCard
                stats={[
                  {
                    value: "1.248",
                    label: "kWh total",
                  },
                  {
                    value: "47",
                    label: "recargas",
                  },
                  {
                    value: "8.2",
                    label: "tCO₂ evitado",
                  },
                ]}
              />
            </View>
          </Animated.View>

          {/* Menu */}
          <Animated.View style={menuStyle}>
            <MenuList
              title="Conta"
              items={MENU_CONTA}
              onPress={(e) => {
                console.log("item clicado", e);
                if (e === "Pagamentos") {
                  router.navigate("/menu-teste");
                }
                if (e === "Meu veículo") {
                  router.navigate("/veiculos");
                }
              }}
            />

            <MenuList
              title="Preferências"
              items={MENU_PREFERENCIA}
              onPress={(e) => {
                if (e === "Configurações") {
                  router.navigate("/configuracoes");
                }
              }}
            />

            <MenuList
              title="Suporte"
              items={MENU_SUPORTE}
              onPress={(e) => {
                if (e === "Sair da conta") {
                  openModal({
                    title: "Realmente deseja sair do aplicativo?",
                    type: "WARNING",
                    titleButton: "Sim",
                    titleButtonCancel: "Não",
                    onPress: signOut,
                  });
                }
              }}
            />
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
