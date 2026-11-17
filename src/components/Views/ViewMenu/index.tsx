import MenuList from "@/src/components/MenuList";
import MenuStatCard from "@/src/components/MenuStatCard";
import ProfileCard from "@/src/components/ProfileCard";
import { useAuth } from "@/src/hooks/useAuth";
import { useModal } from "@/src/hooks/useModal";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useAppDispatch } from "@/src/redux/store";
import {
  getMenuConta,
  getMenuPreferencia,
  getMenuSessao,
  getMenuSuporte,
} from "@/src/utils/enum";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
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
  const { t } = useTranslation();
  const profileO = useSharedValue(0);
  const profileY = useSharedValue(20);
  const menuO = useSharedValue(0);
  const menuY = useSharedValue(24);

  // As abas são pré-carregadas (lazy: false no layout das tabs), então a
  // animação de entrada roda a cada foco em vez de ao montar.
  useFocusEffect(
    useCallback(() => {
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
      return () => {
        profileO.value = 0;
        profileY.value = 20;
        menuO.value = 0;
        menuY.value = 24;
      };
    }, []),
  );

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
            <ProfileCard
              name="Ruan Belmiro"
              email="ruan@teste.com"
              premium
              premiumLabel={t("menu.premiumMember") /* pt: "Membro Premium" */}
            />
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
                    label: t("menu.stats.kwhTotal") /* pt: "kWh total" */,
                  },
                  {
                    value: "47",
                    label: t("menu.stats.recharges") /* pt: "recargas" */,
                  },
                  {
                    value: "8.2",
                    label: t("menu.stats.co2Avoided") /* pt: "tCO₂ evitado" */,
                  },
                ]}
              />
            </View>
          </Animated.View>

          {/* Menu */}
          <Animated.View style={menuStyle}>
            <MenuList
              title={t("menu.sections.account") /* pt: "Conta" */}
              items={getMenuConta(t)}
              onPress={(id) => {
                if (id === "PAGAMENTOS") {
                  router.navigate("/menu-teste");
                }
                if (id === "VEICULO") {
                  router.navigate("/veiculos");
                }
              }}
            />

            <MenuList
              title={t("menu.sections.preferences") /* pt: "Preferências" */}
              items={getMenuPreferencia(t)}
              onPress={(id) => {
                if (id === "CONFIGURACOES") {
                  router.navigate("/configuracoes");
                }
              }}
            />

            <MenuList
              title={t("menu.sections.support") /* pt: "Suporte" */}
              items={getMenuSuporte(t)}
              onPress={(id) => {
                if (id === "REPORTAR_PROBLEMA") {
                  router.navigate("/reportar-problema");
                }
                if (id === "SOBRE") {
                  router.navigate("/sobre");
                }
              }}
            />

            <MenuList
              items={getMenuSessao(t)}
              onPress={(id) => {
                if (id === "SAIR") {
                  openModal({
                    title: t("menu.signOutConfirm") /* pt: "Realmente deseja sair do aplicativo?" */,
                    type: "WARNING",
                    titleButton: t("common.yes") /* pt: "Sim" */,
                    titleButtonCancel: t("common.no") /* pt: "Não" */,
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
