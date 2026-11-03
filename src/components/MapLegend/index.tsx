import { Text, View } from "react-native";
import MapPin from "../MapPin";
import { MapLegendItem, MapLegendProps } from "./MapLegendDTO";
import { styles } from "./styles";

const DEFAULT_ITEMS: MapLegendItem[] = [
  {
    variant: "AVAILABLE",
    title: "Disponível",
    description: "Pronto para carregar",
  },
  {
    variant: "OCCUPIED",
    title: "Ocupado",
    description: "Em uso no momento",
  },
  {
    variant: "BROKEN",
    title: "Indisponível",
    description: "Fora de serviço",
  },
];

// Conteúdo da legenda dos pins. É aberto pelo item "Legenda" do FabGroup
// da home, dentro de um GooeyPopover.
const MapLegend = ({ items = DEFAULT_ITEMS }: MapLegendProps) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Legenda</Text>
      {items.map((item) => (
        <View key={item.variant} style={styles.row}>
          <View style={styles.pinBox}>
            <View style={styles.pinScaled}>
              <MapPin variant={item.variant} />
            </View>
          </View>
          <View style={styles.rowText}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text style={styles.rowDescription}>{item.description}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MapLegend;
