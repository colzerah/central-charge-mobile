import { Text, TouchableOpacity, View } from "react-native";
import { MenuItemProps } from "./MenuConfigDTO";

import { C } from "@/src/theme";
import { ChevronRight } from "lucide-react-native";
import Switch from "../Switch";
import { menuStyles } from "./styles";

export const MenuItem = ({
  icon,
  label,
  sublabel,
  onPress,
  onToggle,
  type,
  active,
  title,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      style={[menuStyles.menuItem]}
      activeOpacity={type === "button" ? 0.8 : 1}
      onPress={type === "button" ? onPress : undefined}
    >
      <View style={[menuStyles.menuIcon]}>{icon}</View>
      <View style={menuStyles.menuText}>
        <Text style={[menuStyles.menuLabel]}>{title}</Text>
        {sublabel && <Text style={menuStyles.menuSublabel}>{sublabel}</Text>}
      </View>
      {type === "button" ? (
        <ChevronRight color={C.ink400} size={17} />
      ) : (
        <Switch onToggle={onToggle} isActive={active} />
      )}
    </TouchableOpacity>
  );
};
