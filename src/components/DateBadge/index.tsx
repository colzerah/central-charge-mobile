import { Text, View } from "react-native";
import { C } from "~/theme";
import { DateBadgeProps } from "./DateBadgeDTO";
import { styles } from "./styles";

// refatorar com os padroes do button

const DateBadge = ({ day, month, bg = true }: DateBadgeProps) => {
  const formattedMonth = month.toUpperCase().slice(0, 3);
  const bgColor = { backgroundColor: bg ? C.ink100 : "transparent" };
  return (
    <View>
      <View style={[styles.dateBox, bgColor]}>
        <Text style={styles.dateDay}>{day}</Text>
        <Text style={styles.dateMonth}>{formattedMonth}</Text>
      </View>
    </View>
  );
};

export default DateBadge;
