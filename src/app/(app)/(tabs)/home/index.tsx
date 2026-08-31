import MapPin from "@/src/components/MapPin";
import { useCoordinates } from "@/src/hooks/useCoordinates";
import { C } from "@/src/theme";
import { pressableOpacity } from "@/src/utils/pressable";
import { LocateFixed } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export default function Home() {
  const mapRef = useRef<MapView>(null);
  const { coordinates } = useCoordinates();

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
        <Marker
          title="TESTE DE TITILO"
          description="TESTE DE DESCRICAO"
          coordinate={{
            latitude: 37.78669,
            longitude: -122.406192,
          }}
          tracksViewChanges={false}
        >
          <MapPin variant="AVAILABLE" />
        </Marker>
        <Marker
          coordinate={{
            latitude: 37.786563,
            longitude: -122.407061,
          }}
          tracksViewChanges={false}
        >
          <MapPin variant="BROKEN" />
        </Marker>
        <Marker
          coordinate={{
            latitude: 37.785537,
            longitude: -122.407587,
          }}
          tracksViewChanges={false}
        >
          <MapPin variant="OCCUPIED" />
        </Marker>
        <Marker
          coordinate={{
            latitude: 37.785511,
            longitude: -122.404926,
          }}
          tracksViewChanges={false}
        >
          <MapPin variant="OCCUPIED" />
        </Marker>
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
