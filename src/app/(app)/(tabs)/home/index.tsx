import BackgroundGradient from "@/src/components/BackgroundGradient";
import ButtonIcon from "@/src/components/ButtonIcon";
import DrawerFilter from "@/src/components/DrawerFilter";
import FabGroup from "@/src/components/FabGroup";
import { FabItems } from "@/src/components/FabGroup/FabGroupDTO";
import MapButtonSheet from "@/src/components/MapButtonSheet";
import {
  MapButtonSheetRef,
  Plugs,
} from "@/src/components/MapButtonSheet/MapButtronSheetDTO";
import AnimatedMapMarker from "@/src/components/MapPin/AnimatedMapMarker";
import SearchBar from "@/src/components/SearchBar";
import { ScrollableSearch } from "@/src/components/shared/ui/base/scrollable-search";
import { TimeTableItemProps } from "@/src/components/TimeTable/TimeTableDTO";
import { useCoordinates } from "@/src/hooks/useCoordinates";
import { addPinSelected } from "@/src/redux/appSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import { C } from "@/src/theme";
import { SymbolView } from "expo-symbols";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
export interface MarketsInterface {
  id: number;
  name: string;
  adress: string;
  supportNumber: string;
  r$kwh: number;
  kwhmax: number;
  schedules: TimeTableItemProps[];
  variant: "BROKEN" | "AVAILABLE" | "OCCUPIED";
  coordinate: {
    latitude: number;
    longitude: number;
  };
  qtdPlugs: number;
  plugs: Plugs[];
}

const mockMarkets = [
  {
    id: 1,
    name: "Post Ipiranga · Ceilândia",
    adress: "QNN 22, Ceilândia Sul",
    variant: "BROKEN",
    r$kwh: 0.23,
    kwhmax: 110,
    supportNumber: "0800 500 5000",
    qtdPlugs: 2,
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
    ],
    coordinate: {
      latitude: -15.829452,
      longitude: -48.107312,
    },
    plugs: [
      {
        id: 1,
        titleSmall: "TESLA-S",
        title: "ISO 8000",
        plugName: "TESLA-S",
        status: "BROKEN",
        kw: 20,
      },
      {
        id: 2,
        titleSmall: "TESLA-S",
        title: "ISO 8000",
        plugName: "TESLA-S",
        status: "BROKEN",
        kw: 30,
      },
    ],
  },
  {
    id: 2,
    name: "Dia a Dia · Ceilândia",
    adress: "QNM 14, Ceilândia Norte",
    distance: "1.2",
    qndPlugs: 1,
    variant: "AVAILABLE",
    r$kwh: 0.43,
    kwhmax: 120,
    supportNumber: "0800 501 5001",
    coordinate: {
      latitude: -15.836911,
      longitude: -48.113987,
    },
    qtdPlugs: 1,
    plugs: [
      {
        id: 1,
        titleSmall: "CSS",
        title: "ISO 167",
        plugName: "CSS",
        status: "AVAILABLE",
        kw: 30,
      },
    ],
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
    ],
  },
  {
    id: 3,
    name: "Post do Balaio - Taguatinga",
    adress: "QNL 20, Taguatinga Norte",
    variant: "OCCUPIED",
    coordinate: {
      latitude: -15.831204,
      longitude: -48.116842,
    },
    r$kwh: 0.63,
    kwhmax: 140,
    supportNumber: "0800 502 5002",
    qtdPlugs: 1,
    plugs: [
      {
        id: 1,
        titleSmall: "TYP1",
        title: "ISO 167",
        plugName: "TYP1",
        status: "OCCUPIED",
        kw: 40,
      },
    ],
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
    ],
  },
  {
    id: 4,
    name: "Post da Zona Leste",
    adress: "QD 100, Val paraiso",
    variant: "AVAILABLE",
    r$kwh: 0.83,
    kwhmax: 180,
    supportNumber: "0800 503 5003",
    coordinate: {
      latitude: -15.838426,
      longitude: -48.104615,
    },
    qtdPlugs: 2,
    plugs: [
      {
        id: 1,
        titleSmall: "TYP2",
        title: "ISO 167",
        plugName: "TYP2",
        status: "OCCUPIED",
        kw: 44,
      },
      {
        id: 2,
        titleSmall: "TYP2",
        title: "ISO 167",
        plugName: "TYP2",
        status: "AVAILABLE",
        kw: 48,
      },
    ],
    schedules: [
      {
        days: "MONDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "TUESDAY",
        hours: "08:00 às 22:00",
      },
      {
        days: "WEDNESDAY",
        hours: "08:00 às 22:00",
      },
    ],
  },
] as MarketsInterface[];

const INITIAL_REGION = {
  latitude: -15.832652,
  longitude: -48.110097,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function Home() {
  const mapRef = useRef<MapView>(null);
  const dispatch = useAppDispatch();
  const { coordinates } = useCoordinates();
  const { values } = useAppSelector((state) => state.appState.home);

  const sheetRef = useRef<MapButtonSheetRef>(null);
  const sheetAnimatedIndex = useSharedValue(-1);
  const regionRef = useRef(INITIAL_REGION);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState("");

  const RECENT = ["Tokyo", "Kyoto", "Osaka"];

  const items = useMemo(() => {
    const search = value.trim().toLowerCase();
    return mockMarkets.filter((item) =>
      item.name.toLowerCase().includes(search),
    );
  }, [value]);

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

  const renderFilter = () => {
    return (
      <View>
        <View style={{ flexDirection: "row", gap: 8, alignItems: "flex-end" }}>
          <View style={{ height: 50 }}>
            <ButtonIcon icon="BatteryCharging" size="sm" variant="outline" />
          </View>
          <View style={{ gap: 8 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: C.white,
                fontFamily: "Inter-Bold",
              }}
            >
              Situação do carregador
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: C.ink400,
                fontFamily: "Inter-Regular",
              }}
            >
              Selecione uma ou mais situações
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <BackgroundGradient>
      <DrawerFilter
        title="Filtros"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={() => {}}
        onClear={() => {}}
        content={renderFilter()}
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
                  <SymbolView
                    name="magnifyingglass"
                    size={16}
                    tintColor="#666"
                  />
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
            initialRegion={INITIAL_REGION}
          >
            {mockMarkets.map((item) => {
              return (
                <AnimatedMapMarker
                  key={item.id}
                  variant={item.variant}
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
    </BackgroundGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  mapOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: C.ink0,
  },

  sheetButton: {
    position: "absolute",
    right: 10,
    bottom: 130,
    // shadowColor: C.black,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 4,
  },
});
