import BackgroundGradient from "@/src/components/BackgroundGradient";
import MapButtonSheet from "@/src/components/MapButtonSheet";
import {
  MapButtonSheetRef,
  Plugs,
} from "@/src/components/MapButtonSheet/MapButtronSheetDTO";
import AnimatedMapMarker from "@/src/components/MapPin/AnimatedMapMarker";
import { useCoordinates } from "@/src/hooks/useCoordinates";
import { C } from "@/src/theme";
import { pressableOpacity } from "@/src/utils/pressable";
import { LocateFixed } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { MarkerPressEvent, PROVIDER_DEFAULT } from "react-native-maps";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
export interface MarketsInterface {
  id: number;
  name: string;
  adress: string;
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
    qtdPlugs: 2,
    coordinate: {
      latitude: 37.786563,
      longitude: -122.407061,
    },
    plugs: [
      {
        id: 1,
        titleSmall: "TESLA-S",
        title: "ISO 8000",
        plugName: "TESLA-S",
        status: "BROKEN",
      },
      {
        id: 2,
        titleSmall: "TESLA-S",
        title: "ISO 8000",
        plugName: "TESLA-S",
        status: "BROKEN",
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
    coordinate: {
      latitude: 37.78669,
      longitude: -122.406192,
    },
    qtdPlugs: 1,
    plugs: [
      {
        id: 1,
        titleSmall: "CSS",
        title: "ISO 167",
        plugName: "CSS",
        status: "AVAILABLE",
      },
    ],
  },
  {
    id: 3,
    name: "Post do Balaio - Taguatinga",
    adress: "QNL 20, Taguatinga Norte",
    variant: "OCCUPIED",
    coordinate: {
      latitude: 37.785537,
      longitude: -122.407587,
    },
    qtdPlugs: 1,
    plugs: [
      {
        id: 1,
        titleSmall: "TYP1",
        title: "ISO 167",
        plugName: "TYP1",
        status: "OCCUPIED",
      },
    ],
  },
  {
    id: 4,
    name: "Post da Zona Leste",
    adress: "QD 100, Val paraiso",
    variant: "AVAILABLE",
    coordinate: {
      latitude: 37.785511,
      longitude: -122.404926,
    },
    qtdPlugs: 2,
    plugs: [
      {
        id: 1,
        titleSmall: "TYP2",
        title: "ISO 167",
        plugName: "TYP2",
        status: "OCCUPIED",
      },
      {
        id: 2,
        titleSmall: "TYP2",
        title: "ISO 167",
        plugName: "TYP2",
        status: "AVAILABLE",
      },
    ],
  },
] as MarketsInterface[];

const INITIAL_REGION = {
  latitude: 37.785834,
  longitude: -122.406417,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

export default function Home() {
  const mapRef = useRef<MapView>(null);
  const { coordinates } = useCoordinates();
  const [selectedMarker, setSelectedMarker] = useState<MarketsInterface>(
    {} as MarketsInterface,
  );
  const sheetRef = useRef<MapButtonSheetRef>(null);
  const regionRef = useRef(INITIAL_REGION);

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

  const handlePressMarket = (
    event: MarkerPressEvent,
    item: MarketsInterface,
  ) => {
    setSelectedMarker(item);
    focusMarkerAboveSheet(event.nativeEvent.coordinate);
    sheetRef.current?.present();
  };

  return (
    <BackgroundGradient>
      <View style={styles.container}>
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
                selected={selectedMarker?.id === item.id}
                coordinate={{
                  latitude: item.coordinate.latitude,
                  longitude: item.coordinate.longitude,
                }}
                onPress={(e) => handlePressMarket(e, item)}
                opacity={1}
              />
            );
          })}
        </MapView>
        <Animated.View
          pointerEvents="none"
          style={[styles.mapOverlay, mapOverlayStyle]}
        />
        <Pressable
          style={({ pressed }) => [
            styles.locateButton,
            {
              opacity: pressableOpacity(pressed),
            },
          ]}
          onPress={handleFindMyLocation}
        >
          <LocateFixed color={C.brand500} size={22} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.sheetButton,
            {
              opacity: pressableOpacity(pressed),
            },
          ]}
          onPress={() => sheetRef.current?.present()}
        >
          <LocateFixed color={C.brand500} size={22} />
        </Pressable>
      </View>
      <MapButtonSheet
        selectedMarket={selectedMarker}
        ref={sheetRef}
        onClose={() => setSelectedMarker({} as MarketsInterface)}
      />
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
  locateButton: {
    position: "absolute",
    right: 16,
    bottom: 120,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  sheetButton: {
    position: "absolute",
    right: 16,
    bottom: 180,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: C.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: C.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
