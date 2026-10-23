import { Text, View } from "react-native";
import { TimeTableItemProps } from "./TimeTableDTO";

import { ENUM_WEEK } from "@/src/utils/enum";
import { menuStyles } from "./styles";

export const MenuItem = ({ days, hours }: TimeTableItemProps) => {
  return (
    <View style={menuStyles.menuItem}>
      <View style={menuStyles.menuText}>
        <Text style={menuStyles.menuLabel}>{ENUM_WEEK[days]}</Text>
        {hours && <Text style={menuStyles.menuSublabel}>{hours}</Text>}
      </View>
    </View>
  );
};
