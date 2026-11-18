import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { View } from "react-native";

import { MenuItem } from "./MenuItem";
import { makeMenuStyles } from "./styles";

import { TimeTablePros } from "./TimeTableDTO";

const TimeTable = ({ items }: TimeTablePros) => {
  const menuStyles = useThemedStyles(makeMenuStyles);
  return (
    <View>
      <View style={menuStyles.menuGroup}>
        {items.map((menu, idx) => (
          <MenuItem
            key={`${menu.days}-${idx}`}
            days={menu.days}
            hours={menu.hours}
          />
        ))}
      </View>
    </View>
  );
};

export default TimeTable;
