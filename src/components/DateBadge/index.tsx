import { Text, View } from "react-native";
import { C } from "~/theme";
import { DateBadgeProps } from "./DateBadgeDTO";
import { styles } from "./styles";

// refatorar com os padroes do button

const DateBadge = ({ day, month, bg = true }: DateBadgeProps) => {
  const formattedMonth = month.toUpperCase().slice(0, 3);
  return (
    <View>
      <View
        style={[
          styles.dateBox,
          { backgroundColor: bg ? C.ink100 : "transparent" },
        ]}
      >
        <Text style={styles.dateDay}>{day}</Text>
        <Text style={styles.dateMonth}>{formattedMonth}</Text>
      </View>
    </View>
  );
};

export default DateBadge;
