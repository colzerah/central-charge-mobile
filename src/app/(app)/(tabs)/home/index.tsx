import BackgroundGradient from "@/src/components/BackgroundGradient";
import MapButtonSheet, {
  IMapButtonSheetRef,
} from "@/src/components/MapButtonSheet";
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

interface MockMarketsInterface {
  id: number;
  name: string;
  variant: "BROKEN" | "AVAILABLE" | "OCCUPIED";
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const mockMarkets = [
  {
    id: 1,
    name: "Market 1",
    variant: "BROKEN",
    coordinate: {
      latitude: 37.786563,
      longitude: -122.407061,
    },
  },
  {
    id: 2,
    name: "Market 2",
    variant: "AVAILABLE",
    coordinate: {
      latitude: 37.78669,
      longitude: -122.406192,
    },
  },
  {
    id: 3,
    name: "Market 3",
    variant: "OCCUPIED",
    coordinate: {
      latitude: 37.785537,
      longitude: -122.407587,
    },
  },
  {
    id: 4,
    name: "Market 4",
    variant: "OCCUPIED",
    coordinate: {
      latitude: 37.785511,
      longitude: -122.404926,
    },
  },
] as MockMarketsInterface[];

const INITIAL_REGION = {
  latitude: 37.785834,
  longitude: -122.406417,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
};

// Fração da altura da tela (0 = topo) onde o marker selecionado deve ficar
// visível, acima da área que o bottom sheet cobre.
const MARKER_FOCUS_SCREEN_RATIO = 0.32;

export default function Home() {
  const mapRef = useRef<MapView>(null);
  const { coordinates } = useCoordinates();
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const sheetRef = useRef<IMapButtonSheetRef>(null);
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
        latitude:
          coordinate.latitude - (0.5 - MARKER_FOCUS_SCREEN_RATIO) * latitudeDelta,
        longitude: coordinate.longitude,
        latitudeDelta,
        longitudeDelta,
      },
      350,
    );
  };

  const handlePressMarket = (event: MarkerPressEvent, idItem: number) => {
    console.log("teste", idItem);
    setSelectedMarkerId(idItem);
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
            console.log("id", item.id);
            console.log(selectedMarkerId);
            return (
              <AnimatedMapMarker
                key={item.id}
                variant={item.variant}
                selected={selectedMarkerId === item.id}
                // title={item.name}
                // description=""
                coordinate={{
                  latitude: item.coordinate.latitude,
                  longitude: item.coordinate.longitude,
                }}
                onPress={(e) => handlePressMarket(e, item.id)}
                opacity={1}
                // titleVisibility="hidden"
              />
            );
          })}
          {/* <AnimatedMapMarker
            variant="AVAILABLE"
            selected={selectedMarkerId === "1"}
            title="TESTE DE TITILO"
            description="TESTE DE DESCRICAO"
            coordinate={{
              latitude: 37.78669,
              longitude: -122.406192,
            }}
            tappable
            onPress={(e) => {
              console.log("e", e);
              setSelectedMarkerId("1");
            }}
            opacity={1}
            // titleVisibility="visible"
          />
          <AnimatedMapMarker
            variant="BROKEN"
            selected={selectedMarkerId === "3"}
            coordinate={{
              latitude: 37.786563,
              longitude: -122.407061,
            }}
            onPress={(e) => handlePressMarket(e)}
          />
          <AnimatedMapMarker
            variant="OCCUPIED"
            selected={selectedMarkerId === "2"}
            coordinate={{
              latitude: 37.785537,
              longitude: -122.407587,
            }}
            onPress={() => setSelectedMarkerId("2")}
          />
          <AnimatedMapMarker
            variant="OCCUPIED"
            selected={selectedMarkerId === "4"}
            coordinate={{
              latitude: 37.785511,
              longitude: -122.404926,
            }}
            onPress={() => setSelectedMarkerId("4")}
          /> */}
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
        ref={sheetRef}
        onPrimaryPress={() => sheetRef.current?.dismiss()}
        onSecondaryPress={() => console.log("Continue with Email")}
        onApplePress={() => console.log("Continue with Apple")}
        onGooglePress={() => console.log("Continue with Google")}
        onClose={() => setSelectedMarkerId(null)}
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
