import { useThemedStyles } from "@/src/hooks/useTheme";
import { Text, View } from "react-native";
import { StatItemDTO } from "./MenuStatCardDTO";
import { makeStyles } from "./styles";

const StatItem = ({ value, label }: StatItemDTO) => {
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
};

export default StatItem;
