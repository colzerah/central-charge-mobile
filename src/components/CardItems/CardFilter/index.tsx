import { Pressable, Text, View } from "react-native";
import { CardFilterProps } from "./CardFilterDTO";

import { C } from "@/src/theme";
import CheckBox from "../../CheckBox";
import Icon from "../../Icon";
import { cardInfoStyles } from "./styles";

const CardFilter = ({
  label,
  onPress,
  type,
  isActive = false,
  count = 0,
}: CardFilterProps) => {
  const iconType = {
    SUCCESS: <Icon name="Check" color={C.success} size={19} />,
    WARNING: <Icon name="Car" color={C.warning} size={18} />,
    ERROR: <Icon name="CircleOff" color={C.error} size={16} />,
  };

  const boderTypeColor = {
    SUCCESS: C.success,
    WARNING: C.warning,
    ERROR: C.error,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        cardInfoStyles.container,
        {
          opacity: pressed && onPress ? 0.5 : 1,
          borderWidth: isActive ? 2 : 0,
          borderColor: boderTypeColor[type],
        },
      ]}
      onPress={onPress}
    >
      <View style={cardInfoStyles.content}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <CheckBox
            bgColor={boderTypeColor[type]}
            size={30}
            borderW={7}
            isCheck={isActive}
            onPress={(e) => console.log("check", e)}
            isReadOnly
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center", marginRight: 2 }}>
          {iconType[type]}
        </View>
        <View style={{ flex: 6, justifyContent: "center" }}>
          <Text style={cardInfoStyles.label}>{label}</Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={cardInfoStyles.count}>{count}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CardFilter;
