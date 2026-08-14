import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

export default function Login() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        initialRegion={{
          latitude: 20405060,
          longitude: 20405060,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "90%",
  },
});
