import { C } from "@/src/theme";
import { Text, View } from "react-native";

import { MenuItem } from "./MenuItem";
import { menuStyles } from "./styles";

import IconBackground from "../IconBackground";
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
              <IconBackground
                icon={menu.icon}
                square
                strokeWidth={2.2}
                backgroundColor={
                  menu.variant === "DANGER" ? C.error + "15" : C.ink100
                }
                iconColor={getIconColor(menu.variant)}
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
