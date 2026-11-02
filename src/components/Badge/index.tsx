import { C } from "@/src/theme";
import { Text, View } from "react-native";
import Icon from "../Icon";
import { BadgeProps } from "./BadgeDTO";
import { styles } from "./styles";

const Badge = ({ icon, count }: BadgeProps) => {
  const formattedCount = count && count > 9 ? "9+" : count;

  return (
    <View style={styles.badge}>
      {icon ? (
        <Icon name={icon} color={C.white} size={13} strokeWidth={2.4} />
      ) : count !== undefined ? (
        <Text style={styles.count}>{formattedCount}</Text>
      ) : null}
    </View>
  );
};

export default Badge;
