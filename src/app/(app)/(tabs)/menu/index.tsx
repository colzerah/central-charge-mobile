import MenuList from "@/src/components/MenuList";
import { logout } from "@/src/redux/authSlice";
import { useAppDispatch } from "@/src/redux/store";
import { C } from "@/src/theme";
import { MENU_CONTA, MENU_PREFERENCIA, MENU_SUPORTE } from "@/src/utils/enum";
import { router } from "expo-router";
import { User, Zap } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
  const dispatch = useAppDispatch();
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
    <>
      {/* <Stack.Title>Search</Stack.Title> */}
      {/* <Stack.SearchBar
        placement="stacked"
        placeholder="Search"
        onChangeText={() => {}}
      /> */}
      <View style={styles.root}>
        <SafeAreaView style={styles.flex}>
          <ScrollView
            style={styles.flex}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {/* Perfil */}
            <Animated.View style={[styles.profileCard, profileStyle]}>
              <View style={styles.profileAvatar}>
                <User color={C.brand400} size={32} strokeWidth={2} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Carlos Andrade</Text>
                <Text style={styles.profileEmail}>carlos@voltcharge.com</Text>
                <View style={styles.profileBadge}>
                  <Zap
                    color={C.brand300}
                    size={12}
                    strokeWidth={2.5}
                    fill={C.brand400}
                  />
                  <Text style={styles.profileBadgeText}>Membro Premium</Text>
                </View>
              </View>
            </Animated.View>

            {/* Estatísticas */}
            <Animated.View style={[styles.statsRow, profileStyle]}>
              <StatItem value="1.248" label="kWh total" />
              <View style={styles.statDivider} />
              <StatItem value="47" label="recargas" />
              <View style={styles.statDivider} />
              <StatItem value="8.2" label="tCO₂ evitado" />
            </Animated.View>

            {/* Menu */}
            <Animated.View style={menuStyle}>
              <MenuList
                title="Conta"
                items={MENU_CONTA}
                onPress={(e) => {
                  if (e === "Pagamentos") {
                    router.navigate("/menu/teste");
                  }
                }}
              />

              <MenuList
                title="Preferências"
                items={MENU_PREFERENCIA}
                onPress={(e) => console.log(e)}
              />

              <MenuList
                title="Suporte"
                items={MENU_SUPORTE}
                onPress={(e) => {
                  if (e === "Sair da conta") {
                    dispatch(logout());
                    router.replace("/login");
                  }
                }}
              />
            </Animated.View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.ink0 },
  flex: { flex: 1 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: C.ink100,
    borderWidth: 2,
    borderColor: C.brand400,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: { flex: 1, marginLeft: 16 },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  profileEmail: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: C.brand400 + "20",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  profileBadgeText: {
    fontSize: 11,
    color: C.brand300,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 12,
  },
  statItem: { flex: 1, alignItems: "center" },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  statLabel: {
    fontSize: 11,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  statDivider: { width: 1, height: 32, backgroundColor: C.ink200 },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: C.ink300,
    fontFamily: "Inter-Bold",
    paddingHorizontal: 24,
    marginTop: 26,
    marginBottom: 9,
    letterSpacing: 0.3,
  },
  menuGroup: {
    backgroundColor: C.ink50,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: C.ink200,
    marginHorizontal: 20,
    overflow: "hidden",
  },
  menuItem: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: C.ink200 },
  menuIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconDanger: { backgroundColor: C.error + "15" },
  menuText: { flex: 1, marginLeft: 12 },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: C.white,
    fontFamily: "Inter-SemiBold",
  },
  menuLabelDanger: { color: C.error },
  menuSublabel: {
    fontSize: 11,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    marginTop: 1,
  },
});
