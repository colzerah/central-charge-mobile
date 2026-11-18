import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { C } from "@/src/theme";
import { Text, View } from "react-native";
import Icon from "../Icon";
import { makeStyles } from "./styles";
import { SummaryCardDTO } from "./SummaryCardDTO";

const SummaryCard = ({ value, label, icon }: SummaryCardDTO) => {
  const { colors: C } = useTheme();
  const styles = useThemedStyles(makeStyles);
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryIcon}>
        <Icon name={icon} color={C.brand400} size={20} strokeWidth={2.2} />
      </View>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
};

export default SummaryCard;
