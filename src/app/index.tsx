import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.heroSection}>
          <Text style={styles.title}>
            Hello World!
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
});
