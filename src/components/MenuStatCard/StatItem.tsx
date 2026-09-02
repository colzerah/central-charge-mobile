import { Text, View } from "react-native";
import { StatItemDTO } from "./MenuStatCardDTO";
import { styles } from "./styles";

const StatItem = ({ value, label }: StatItemDTO) => {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

export default StatItem;
