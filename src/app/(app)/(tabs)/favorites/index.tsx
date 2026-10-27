import { C } from "@/src/theme";
import { MapPin, Star, Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface FavoriteStation {
  station: ChargingStation;
  savedAt: string;
}

export interface StationHours {
  day: string;
  hours: string;
}

export type StationStatus = "available" | "busy" | "offline";

export interface Plug {
  id: string;
  standard: string;
  type: string;
  power: number;
}

export interface ChargingStation {
  id: string;
  name: string;
  x: number;
  y: number;
  status: StationStatus;
  power: number;
  distance: number;
  price: number;
  address: string;
  phone: string;
  plugs: Plug[];
  hours: StationHours[];
}

const DEFAULT_HOURS: StationHours[] = [
  { day: "Segunda-feira", hours: "08:00 às 22:00" },
  { day: "Terça-feira", hours: "08:00 às 22:00" },
  { day: "Quarta-feira", hours: "08:00 às 22:00" },
  { day: "Quinta-feira", hours: "08:00 às 22:00" },
  { day: "Sexta-feira", hours: "08:00 às 23:00" },
  { day: "Sábado", hours: "09:00 às 23:00" },
  { day: "Domingo", hours: "09:00 às 20:00" },
];

const STATIONS: ChargingStation[] = [
  {
    id: "1",
    name: "Estação Centro",
    x: 0.32,
    y: 0.28,
    status: "available",
    power: 150,
    distance: 0.8,
    price: 0.89,
    address: "Ceilândia Sul, QNN 15, Conjunto D, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 150 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 22 },
    ],
    hours: DEFAULT_HOURS,
  },
  {
    id: "2",
    name: "Estação Norte",
    x: 0.62,
    y: 0.22,
    status: "busy",
    power: 350,
    distance: 2.4,
    price: 0.79,
    address: "Taguatinga Norte, QNB 08, Área Especial 2, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 350 },
      { id: "p2", standard: "ISO 168", type: "CHAdeMO", power: 100 },
    ],
    hours: DEFAULT_HOURS,
  },
  {
    id: "3",
    name: "Estação Shopping",
    x: 0.48,
    y: 0.52,
    status: "available",
    power: 250,
    distance: 1.5,
    price: 0.92,
    address: "Setor Comercial Sul, EQ 8/12, Asa Sul, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 250 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 43 },
    ],
    hours: DEFAULT_HOURS,
  },
  {
    id: "4",
    name: "Estação Sul",
    x: 0.22,
    y: 0.68,
    status: "offline",
    power: 120,
    distance: 3.1,
    price: 0.85,
    address: "Gama Sul, QE 38, Área Especial, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [{ id: "p1", standard: "ISO 167", type: "CCS2", power: 120 }],
    hours: DEFAULT_HOURS,
  },
  {
    id: "5",
    name: "Estação Praça",
    x: 0.76,
    y: 0.62,
    status: "available",
    power: 350,
    distance: 2.8,
    price: 0.75,
    address: "Águas Claras, Avenida Castanheira, Q 400, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 350 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 22 },
    ],
    hours: DEFAULT_HOURS,
  },
  {
    id: "6",
    name: "Estação Parque",
    x: 0.4,
    y: 0.8,
    status: "busy",
    power: 150,
    distance: 4.2,
    price: 0.88,
    address: "Sobradinho, EQ 12/16, Área Especial, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 150 },
      { id: "p2", standard: "ISO 168", type: "CHAdeMO", power: 50 },
    ],
    hours: DEFAULT_HOURS,
  },
  {
    id: "7",
    name: "Estação Aeroporto",
    x: 0.85,
    y: 0.38,
    status: "available",
    power: 250,
    distance: 5.5,
    price: 0.95,
    address: "Lago Sul, SHIS QI 19, Via Aeroporto, Brasília - DF",
    phone: "0800 500 5000",
    plugs: [
      { id: "p1", standard: "ISO 167", type: "CCS2", power: 250 },
      { id: "p2", standard: "ISO 168", type: "Type 2", power: 43 },
    ],
    hours: DEFAULT_HOURS,
  },
];

const INITIAL_FAVORITES: FavoriteStation[] = [
  { station: STATIONS[0], savedAt: "Adicionado em 10 Ago" },
  { station: STATIONS[2], savedAt: "Adicionado em 08 Ago" },
  { station: STATIONS[4], savedAt: "Adicionado em 05 Ago" },
];

export default function FavoritosScreen() {
  const [favorites, setFavorites] =
    useState<FavoriteStation[]>(INITIAL_FAVORITES);
  const [refreshing, setRefreshing] = useState(false);

  const contentO = useSharedValue(0);
  const contentY = useSharedValue(24);

  useEffect(() => {
    contentO.value = withDelay(100, withTiming(1, { duration: 500 }));
    contentY.value = withDelay(
      100,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) }),
    );
  }, []);

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentO.value,
    transform: [{ translateY: contentY.value }],
  }));

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const handleRemove = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.station.id !== id));
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favoritos</Text>
          <Text style={styles.headerSubtitle}>
            {favorites.length > 0
              ? `${favorites.length} estações salvas`
              : "Nenhuma estação favoritada"}
          </Text>
        </View>

        <ScrollView
          style={styles.flex}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={C.brand400}
              colors={[C.brand400]}
            />
          }
        >
          <Animated.View style={contentStyle}>
            {favorites.length > 0 ? (
              favorites.map((fav) => (
                <FavoriteCard
                  key={fav.station.id}
                  favorite={fav}
                  onRemove={() => handleRemove(fav.station.id)}
                />
              ))
            ) : (
              <View style={styles.emptyWrap}>
                <Star color={C.ink400} size={48} strokeWidth={1.5} />
                <Text style={styles.emptyText}>Nenhum favorito ainda</Text>
                <Text style={styles.emptySub}>
                  Toque na estrela de uma estação para salvá-la aqui
                </Text>
              </View>
            )}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function FavoriteCard({
  favorite,
  onRemove,
}: {
  favorite: FavoriteStation;
  onRemove: () => void;
}) {
  const station = favorite.station;
  const statusColor =
    station.status === "available"
      ? C.success
      : station.status === "busy"
        ? C.warning
        : C.error;
  const statusLabel =
    station.status === "available"
      ? "Disponível"
      : station.status === "busy"
        ? "Ocupado"
        : "Offline";

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.cardIconWrap}>
          <Zap
            color={C.brand400}
            size={20}
            strokeWidth={2.2}
            fill={C.brand300}
          />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{station.name}</Text>
          <View style={styles.cardMeta}>
            <MapPin color={C.ink400} size={13} strokeWidth={2} />
            <Text style={styles.cardDistance}>
              {station.distance} km de você
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onRemove}
          style={styles.starBtn}
          activeOpacity={0.7}
          hitSlop={8}
        >
          <Star
            color={C.brand400}
            size={22}
            strokeWidth={2.2}
            fill={C.brand400}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.cardAddress} numberOfLines={2}>
        {station.address}
      </Text>

      <View style={styles.cardFooter}>
        <View style={styles.cardStats}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusColor + "20" },
            ]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: statusColor }]}
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
          <Text style={styles.cardPower}>{station.power} kW</Text>
          <Text style={styles.cardPrice}>
            R$ {station.price.toFixed(2).replace(".", ",")}/kWh
          </Text>
        </View>
        <Text style={styles.savedAt}>{favorite.savedAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.ink0 },
  flex: { flex: 1 },

  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 },
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

  card: {
    backgroundColor: C.ink50,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: C.ink200,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: C.brand400 + "18",
    borderWidth: 1,
    borderColor: C.brand400 + "44",
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: { flex: 1, marginLeft: 12 },
  cardName: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  cardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  cardDistance: { fontSize: 12, color: C.ink400, fontFamily: "Inter-Regular" },
  starBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: C.ink100,
    alignItems: "center",
    justifyContent: "center",
  },

  cardAddress: {
    fontSize: 12,
    color: C.ink300,
    fontFamily: "Inter-Regular",
    lineHeight: 17,
    marginBottom: 12,
  },

  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: "600", fontFamily: "Inter-SemiBold" },
  cardPower: {
    fontSize: 12,
    color: C.ink300,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  },
  cardPrice: {
    fontSize: 12,
    color: C.brand400,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
  },
  savedAt: { fontSize: 11, color: C.ink500, fontFamily: "Inter-Regular" },

  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    gap: 10,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "700",
    color: C.white,
    fontFamily: "Inter-Bold",
  },
  emptySub: {
    fontSize: 13,
    color: C.ink400,
    fontFamily: "Inter-Regular",
    textAlign: "center",
    marginHorizontal: 32,
  },
});
