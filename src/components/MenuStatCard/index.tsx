import { View } from "react-native";
import Divider from "../Divider";
import { MenuStatCardProps } from "./MenuStatCardDTO";
import StatItem from "./StatItem";
import { styles } from "./styles";

const MenuStatCard = ({ stats }: MenuStatCardProps) => {
  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.itemContainer}>
          <StatItem value={stat.value} label={stat.label} />

          {index !== stats.length - 1 && <Divider type="vertical" h={32} />}
        </View>
      ))}
    </View>
  );
};

export default MenuStatCard;
