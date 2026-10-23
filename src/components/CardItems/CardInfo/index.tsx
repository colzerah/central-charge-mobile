import { Pressable, Text, View } from "react-native";
import { CardInfoProps } from "./CardInfoDTO";

import { C } from "@/src/theme";
import IconBackground from "../../IconBackground";
import { cardInfoStyles } from "./styles";

const CardInfo = ({ description, onPress, iconName }: CardInfoProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        cardInfoStyles.container,
        { opacity: pressed && onPress ? 0.5 : 1 },
      ]}
      onPress={onPress}
    >
      <View style={cardInfoStyles.content}>
        <View style={cardInfoStyles.contentRow}>
          <View style={cardInfoStyles.viewIcon}>
            <IconBackground
              icon={iconName}
              square
              size="sm"
              iconColor={C.brand400}
              backgroundColor={C.brand400 + 60}
            />
          </View>
          <View style={cardInfoStyles.viewText}>
            <Text style={cardInfoStyles.description}>{description}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardInfo;
