import { C } from "@/src/theme";
import { Text, View } from "react-native";

import Icon from "../Icon";
import { MenuItem } from "./MenuItem";
import { menuStyles } from "./styles";

import { MenuPros } from "./MenuDTO";

const MenuList = ({ title, items, onPress }: MenuPros) => {
  const getIconColor = (variant: "PRIMARY" | "SECOND" | "DANGER") => {
    if (variant === "SECOND") {
      return C.ink300;
    }

    if (variant === "DANGER") {
      return C.error;
    }

    return C.brand400;
  };

  return (
    <View>
      {title && <Text style={menuStyles.sectionTitle}>{title}</Text>}
      <View style={menuStyles.menuGroup}>
        {items.map((menu, idx) => (
          <MenuItem
            key={`${menu.label}-${idx}`}
            danger={menu.variant === "DANGER"}
            icon={
              <Icon
                name={menu.icon}
                size={19}
                strokeWidth={2.2}
                color={getIconColor(menu.variant)}
              />
            }
            label={menu.label}
            sublabel={menu.subLabel}
            onPress={() => onPress(menu.label)}
          />
        ))}
      </View>
    </View>
  );
};

export default MenuList;
