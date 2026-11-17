import { TFunction } from "@/src/i18n";
import { useTranslation } from "@/src/hooks/useTranslation";
import { Text, View } from "react-native";
import MapPin from "../MapPin";
import { MapLegendItem, MapLegendProps } from "./MapLegendDTO";
import { styles } from "./styles";

const getDefaultItems = (t: TFunction): MapLegendItem[] => [
  {
    variant: "AVAILABLE",
    title: t("status.available") /* pt: "Disponível" */,
    description: t("home.legend.availableDescription") /* pt: "Pronto para carregar" */,
  },
  {
    variant: "OCCUPIED",
    title: t("status.occupied") /* pt: "Ocupado" */,
    description: t("home.legend.occupiedDescription") /* pt: "Em uso no momento" */,
  },
  {
    variant: "BROKEN",
    title: t("status.broken") /* pt: "Indisponível" */,
    description: t("home.legend.brokenDescription") /* pt: "Fora de serviço" */,
  },
];

// Conteúdo da legenda dos pins. É aberto pelo item "Legenda" do FabGroup
// da home, dentro de um GooeyPopover.
const MapLegend = ({ items }: MapLegendProps) => {
  const { t } = useTranslation();
  const legendItems = items ?? getDefaultItems(t);

  return (
    <View style={styles.content}>
      <Text style={styles.title}>{t("home.legend.title") /* pt: "Legenda" */}</Text>
      {legendItems.map((item) => (
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
