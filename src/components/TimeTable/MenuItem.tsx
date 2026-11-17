import { Text, View } from "react-native";
import { TimeTableItemProps } from "./TimeTableDTO";

import { useTranslation } from "@/src/hooks/useTranslation";
import { menuStyles } from "./styles";

export const MenuItem = ({ days, hours }: TimeTableItemProps) => {
  const { t } = useTranslation();
  return (
    <View style={menuStyles.menuItem}>
      <View style={menuStyles.menuText}>
        <Text style={menuStyles.menuLabel}>{t(`weekdays.${days}`) /* pt: weekdays.* → "Segunda-feira", "Terça-feira", "Quarta-feira", … */}</Text>
        {hours && <Text style={menuStyles.menuSublabel}>{hours}</Text>}
      </View>
    </View>
  );
};
