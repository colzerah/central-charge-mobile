import { ScrollView, Text, View } from "react-native";

export default function Home() {
  //componente VierHome
  return (
    <ScrollView>
      <View style={{ backgroundColor: "red", height: 300 }}>
        <Text>Central Charge Home</Text>
      </View>
      <View style={{ backgroundColor: "blue", height: 300 }}>
        <Text>Central Charge Home</Text>
      </View>
      <View style={{ backgroundColor: "green", height: 300 }}>
        <Text>Central Charge Home</Text>
      </View>
      <View style={{ backgroundColor: "brown", height: 300 }}>
        <Text>Central Charge Home</Text>
      </View>
    </ScrollView>
  );
}
