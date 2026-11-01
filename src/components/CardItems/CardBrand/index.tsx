import { Image, Pressable, Text, View } from "react-native";
import { CardBrandProps } from "./CardBrandDTO";

import { C } from "@/src/theme";
import { COLOR_PALETTE } from "@/src/utils/enum";
import Icon from "../../Icon";
import { cardInfoStyles } from "./styles";

const CardBrand = ({
  label,
  onPress,
  isActive = false,
  count = 0,
  uri,
  indexColor = 0,
}: CardBrandProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        cardInfoStyles.container,
        {
          backgroundColor: isActive ? COLOR_PALETTE[indexColor] + 22 : C.ink100,
          opacity: pressed && onPress ? 0.5 : 1,
          borderColor: isActive ? COLOR_PALETTE[indexColor] : C.ink200,
        },
      ]}
      onPress={onPress}
    >
      {isActive && (
        <View
          style={{
            ...cardInfoStyles.viewIcon,
            backgroundColor: COLOR_PALETTE[indexColor],
          }}
        >
          <Icon name="Check" size={11} color={C.white} strokeWidth={3} />
        </View>
      )}
      <View style={cardInfoStyles.content}>
        <View
          style={{
            ...cardInfoStyles.viewImage,
            borderColor: COLOR_PALETTE[indexColor],
            backgroundColor: COLOR_PALETTE[indexColor] + 22,
          }}
        >
          {uri ? (
            <Image
              source={{ uri: uri }}
              style={cardInfoStyles.image}
              resizeMode="contain"
            />
          ) : (
            <Text
              style={{
                ...cardInfoStyles.textImage,
                color: COLOR_PALETTE[indexColor],
              }}
            >
              {label.charAt(0)}
            </Text>
          )}
        </View>

        <Text
          style={{
            ...cardInfoStyles.textName,
            color: isActive ? COLOR_PALETTE[indexColor] : C.white,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>

        <Text style={cardInfoStyles.textStation}>
          {count} {count <= 1 ? "estação" : "estações"}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardBrand;
