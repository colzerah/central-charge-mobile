import DrawerFilter from "@/src/components/DrawerFilter";
import FabGroup from "@/src/components/FabGroup";
import { FabItems } from "@/src/components/FabGroup/FabGroupDTO";
import MapButtonSheet from "@/src/components/MapButtonSheet";
import { MapButtonSheetRef } from "@/src/components/MapButtonSheet/MapButtronSheetDTO";
import MapLegend from "@/src/components/MapLegend";
import AnimatedMapMarker from "@/src/components/MapPin/AnimatedMapMarker";
import SearchBar from "@/src/components/SearchBar";
import { ScrollableSearch } from "@/src/components/shared/ui/base/scrollable-search";
import ViewFilter from "@/src/components/Views/ViewFilter";
import { useCoordinates } from "@/src/hooks/useCoordinates";
import { addPinSelected } from "@/src/redux/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { C } from "@/src/theme";
import { MOCK_INITIAL_REGION, MOCK_MARKETS } from "@/src/utils/mocks";
import { SymbolView } from "expo-symbols";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { styles } from "./styles";
import { MarketsInterface } from "./ViewHomeDTO";

export default function ViewHome() {
  const mapRef = useRef<MapView>(null);
  const dispatch = useAppDispatch();
  const { coordinates } = useCoordinates();
  const { values } = useAppSelector((state) => state.appState.home);

  const sheetRef = useRef<MapButtonSheetRef>(null);
  const sheetAnimatedIndex = useSharedValue(-1);
  const regionRef = useRef(MOCK_INITIAL_REGION);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState("");

  const items = useMemo(() => {
    const search = value.trim().toLowerCase();
    return MOCK_MARKETS.filter((item) =>
      item.name.toLowerCase().includes(search),
    );
  }, [value]);

  // O grupo abre para cima: o primeiro do array fica junto do "+" e o
  // último fica no topo. A legenda vai no topo, para o popover dela abrir
  // sem cobrir os outros botões.
  const ITEMS = [
    {
      iconName: "Navigation",
      value: "NAVIGATION",
      onPress: () => handleFindMyLocation(),
    },
    {
      iconName: "SlidersHorizontal",
      value: "FILTER",
      onPress: () => setDrawerOpen(true),
    },
    {
      iconName: "Info",
      value: "LEGEND",
      popover: <MapLegend />,
    },
  ] as FabItems[];

  // MapKit/Google Maps paints its own light placeholder before tiles load,
  // which flashes against this app's dark theme. Cover the map with a
  // dark overlay until it reports ready, then fade it out.
  const mapOverlayOpacity = useSharedValue(1);
  const mapOverlayStyle = useAnimatedStyle(() => ({
    opacity: mapOverlayOpacity.value,
  }));

  const handleMapReady = () => {
    mapOverlayOpacity.value = withTiming(0, { duration: 250 });
  };

  useEffect(() => {
    console.log("coordinates", coordinates);
  }, [coordinates]);

  const handleFindMyLocation = () => {
    if (!coordinates) return;

    mapRef.current?.animateToRegion(
      {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      500,
    );
  };

  const focusMarkerAboveSheet = (coordinate: {
    latitude: number;
    longitude: number;
  }) => {
    const { latitudeDelta, longitudeDelta } = regionRef.current;

    mapRef.current?.animateToRegion(
      {
        latitude: coordinate.latitude - (0.5 - 0.32) * latitudeDelta,
        longitude: coordinate.longitude,
        latitudeDelta,
        longitudeDelta,
      },
      350,
    );
  };

  const handleSelectMarket = (item: MarketsInterface) => {
    dispatch(addPinSelected(item));
    focusMarkerAboveSheet(item.coordinate);
  };

  return (
    <DrawerFilter
      title="Filtros"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      onApply={() => {}}
      onClear={() => {}}
      content={<ViewFilter />}
    >
      <View style={styles.container}>
        <ScrollableSearch>
          <SearchBar
            value={value}
            onPress={handleSelectMarket}
            items={items}
            onChange={setValue}
            focusedOffset={-70}
            unfocusedOffset={-40}
            scrollableSearch={(item) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: C.disabled500,
                  padding: 14,
                  borderRadius: 12,
                  marginBottom: 8,
                  gap: 12,
                  borderWidth: 1,
                  borderColor: C.border,
                }}
              >
                <SymbolView name="magnifyingglass" size={16} tintColor="#666" />
                <Text style={{ flex: 1, fontSize: 15, color: C.white }}>
                  {item.name}
                </Text>
                <SymbolView name="arrow.up.left" size={14} tintColor="#444" />
              </View>
            )}
          />
        </ScrollableSearch>
        <MapView
          ref={mapRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          showsUserLocation={!!coordinates}
          onMapReady={handleMapReady}
          onRegionChangeComplete={(region) => {
            regionRef.current = region;
          }}
          initialRegion={MOCK_INITIAL_REGION}
        >
          {MOCK_MARKETS.map((item) => {
            return (
              <AnimatedMapMarker
                key={item.id}
                variant={item.variant}
                centerImage={item.image ? { uri: item.image } : undefined}
                selected={values.pinSelected?.id === item.id}
                sheetAnimatedIndex={sheetAnimatedIndex}
                coordinate={{
                  latitude: item.coordinate.latitude,
                  longitude: item.coordinate.longitude,
                }}
                onPress={() => handleSelectMarket(item)}
                opacity={1}
              />
            );
          })}
        </MapView>
        <Animated.View
          pointerEvents="none"
          style={[styles.mapOverlay, mapOverlayStyle]}
        />

        <View style={styles.sheetButton}>
          <FabGroup items={ITEMS} />
        </View>
      </View>
      <MapButtonSheet
        selectedMarket={values.pinSelected}
        ref={sheetRef}
        animatedIndex={sheetAnimatedIndex}
        onClose={() => {
          dispatch(addPinSelected());
        }}
      />
    </DrawerFilter>
  );
}
