import { View } from "react-native";

import { MenuItem } from "./MenuItem";
import { menuStyles } from "./styles";

import { TimeTablePros } from "./TimeTableDTO";

const TimeTable = ({ items }: TimeTablePros) => {
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
