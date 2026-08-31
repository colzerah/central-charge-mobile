import { C } from "@/src/theme";
import { ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { MenuItemProps } from "./MenuDTO";

import { menuStyles } from "./styles";

export const MenuItem = ({
  icon,
  label,
  sublabel,
  danger,
  onPress,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      style={[menuStyles.menuItem, !danger && menuStyles.menuItemBorder]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={[menuStyles.menuIcon, danger && menuStyles.menuIconDanger]}>
        {icon}
      </View>
      <View style={menuStyles.menuText}>
        <Text
          style={[menuStyles.menuLabel, danger && menuStyles.menuLabelDanger]}
        >
          {label}
        </Text>
        {sublabel && <Text style={menuStyles.menuSublabel}>{sublabel}</Text>}
      </View>
      <ChevronRight color={C.ink400} size={17} />
    </TouchableOpacity>
  );
};
