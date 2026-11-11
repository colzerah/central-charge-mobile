import { useModal } from "@/src/hooks/useModal";
import { C } from "@/src/theme";
import { MOCK_INITIAL_FAVORITES, MOCK_SORT_OPTIONS } from "@/src/utils/mocks";
import { MapPin, Star, Trash2, Zap } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    RefreshControl,
    ScrollView,
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
import { styles } from "./styles";
import {
    ChargingStation,
    FavoriteStation,
    SortOption,
} from "./ViewFavoritesDTO";

export default function ViewFavorites() {
  const [favorites, setFavorites] = useState<FavoriteStation[]>(
    MOCK_INITIAL_FAVORITES,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const { openModal } = useModal();

  // "Recentes" mantém a ordem em que foram salvos; "Mais perto" ordena
  // da menor para a maior distância
  const sortedFavorites =
    sortBy === "nearest"
      ? [...favorites].sort((a, b) => a.station.distance - b.station.distance)
      : favorites;

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

  const handleRemove = (station: ChargingStation) => {
    openModal({
      title: "Deseja remover dos favoritos?",
      subTitle: `Ao remover, "${station.name}" deixará de estar na sua lista de favoritos.`,
      type: "WARNING",
      titleButton: "Remover",
      titleButtonCancel: "Cancelar",
      onPress: () =>
        setFavorites((prev) => prev.filter((f) => f.station.id !== station.id)),
    });
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

        {favorites.length > 0 && (
          <View style={styles.filters}>
            {MOCK_SORT_OPTIONS.map((option) => {
              const active = sortBy === option.value;
              return (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => setSortBy(option.value)}
                  style={[styles.filterChip, active && styles.filterChipActive]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterText,
                      active && styles.filterTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

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
              sortedFavorites.map((fav) => (
                <FavoriteCard
                  key={fav.station.id}
                  favorite={fav}
                  onRemove={() => handleRemove(fav.station)}
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
          style={styles.removeBtn}
          activeOpacity={0.7}
          hitSlop={8}
        >
          <Trash2 color={C.error} size={20} strokeWidth={2.2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.cardAddress} numberOfLines={2}>
        {station.address}
      </Text>

      <View style={styles.cardFooter}>
        <View
          style={[styles.statusBadge, { backgroundColor: statusColor + "20" }]}
        >
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={[styles.statusText, { color: statusColor }]}>
            {statusLabel}
          </Text>
        </View>
        <View style={styles.cardValues}>
          <Text style={styles.cardPower}>{station.power} kW</Text>
          <Text style={styles.cardPrice}>
            R$ {station.price.toFixed(2).replace(".", ",")}/kWh
          </Text>
        </View>
      </View>

      <Text style={styles.savedAt}>{favorite.savedAt}</Text>
    </View>
  );
}
