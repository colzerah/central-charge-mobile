import { C } from "@/src/theme";
import { Text, View } from "react-native";
import Icon from "../Icon";
import { StationCardProps } from "./StationCardDTO";
import { styles } from "./styles";

const StationCard = ({
  title = "Estação Shopping",
  type,
}: StationCardProps) => {
  const colorType = {
    BROKEN: C.error,
    AVAILABLE: C.success,
    OCCUPIED: C.warning,
  };

  const labelStatus = {
    BROKEN: "Disponível",
    AVAILABLE: "Ocupado",
    OCCUPIED: "Indisponível",
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.viewIcon, { backgroundColor: colorType[type] }]}>
          <Icon name="BatteryCharging" size={28} strokeWidth={2.5} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <View style={[styles.dot, { backgroundColor: colorType[type] }]} />
            <Text style={[styles.textStatus, { color: colorType[type] }]}>
              {labelStatus[type]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StationCard;
