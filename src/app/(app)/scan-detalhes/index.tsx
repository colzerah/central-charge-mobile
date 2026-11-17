import ViewScan from "@/src/components/Views/ViewScan";
import { View } from "react-native";

export default function ScanDetalhesScreen() {
  return (
    // flex: 1 para o fundo da tela ocupar toda a altura disponível
    <View style={{ flex: 1 }}>
      <ViewScan />
    </View>
  );
}
