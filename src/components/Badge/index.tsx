import { C } from "@/src/theme";
import { View } from "react-native";
import Icon from "../Icon";
import { BadgeProps } from "./BadgeDTO";
import { styles } from "./styles";

const Badge = ({ icon }: BadgeProps) => {
  <View style={styles.badge}>
    <Icon name={icon} color={C.white} size={13} strokeWidth={2.4} />
  </View>;
};

export default Badge;
