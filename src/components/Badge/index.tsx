import { C } from "@/src/theme";
import { useMemo } from "react";
import { Text, View } from "react-native";
import Icon from "../Icon";
import { BadgeProps } from "./BadgeDTO";
import { styles } from "./styles";

const Badge = ({ icon, count }: BadgeProps) => {
  const formattedCount = useMemo(
    () => (count && count > 9 ? "9+" : count),
    [count],
  );

  return (
    <View style={styles.badge}>
      {count && <Text style={styles.count}>{formattedCount}</Text>}
      {icon && count === undefined && (
        <Icon name={icon} color={C.white} size={13} strokeWidth={2.4} />
      )}
    </View>
  );
};

export default Badge;
