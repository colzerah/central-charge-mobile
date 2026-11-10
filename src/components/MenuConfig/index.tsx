import { Text, View } from "react-native";

import { MenuItem } from "./MenuItem";
import { menuStyles } from "./styles";

import IconBackground from "../IconBackground";
import { MenuConfigPros } from "./MenuConfigDTO";

const MenuConfig = ({ title, items, onPress, active }: MenuConfigPros) => {
  return (
    <View>
      {title && <Text style={menuStyles.sectionTitle}>{title}</Text>}
      <View style={menuStyles.menuGroup}>
        {items.map((menu, idx) => (
          <MenuItem
            key={`${menu.label}-${idx}`}
            icon={
              <IconBackground
                icon={menu.icon}
                square
                strokeWidth={2.2}
                backgroundColor={menu.color}
                iconColor={menu.color}
              />
            }
            title={menu.title}
            label={menu.label}
            sublabel={menu.subLabel}
            onPress={onPress ? () => onPress(menu.label) : undefined}
            onToggle={onPress ? (e) => onPress(menu.label, e) : undefined}
            // onToggle={(e) => console.log(`Toggle ${menu.label}`, e)}
            type={menu.type}
            active={active[menu.label] || false}
          />
        ))}
      </View>
    </View>
  );
};

export default MenuConfig;
