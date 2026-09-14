import BackgroundGradient from "@/src/components/BackgroundGradient";
import AnimatedMapMarker from "@/src/components/MapPin/AnimatedMapMarker";
import { useCoordinates } from "@/src/hooks/useCoordinates";
import { C } from "@/src/theme";
import { pressableOpacity } from "@/src/utils/pressable";
import { LocateFixed } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export default function Home() {
  const mapRef = useRef<MapView>(null);
  const { coordinates } = useCoordinates();
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

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

  return (
    <BackgroundGradient>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          showsUserLocation={!!coordinates}
          initialRegion={{
            latitude: 37.785834,
            longitude: -122.406417,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <AnimatedMapMarker
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
            onPress={() => setSelectedMarkerId("3")}
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
          />
        </MapView>
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
      </View>
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
});
