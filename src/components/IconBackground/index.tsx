import { View } from "react-native";
import Icon from "../Icon";
import { IconBackgroundProps } from "./IconBackgroundDTO";
import { styles } from "./styles";

const sizeMap = {
  sm: { bgSize: 36, iconSize: 19 },
  md: { bgSize: 46, iconSize: 24 },
  lg: { bgSize: 48, iconSize: 22 },
} as const;

const IconBackground = ({
  icon,
  backgroundColor,
  size = "sm",
  square,
  iconColor = "white",
}: IconBackgroundProps) => {
  const backgroundSize = sizeMap[size].bgSize;
  const iconSize = sizeMap[size].iconSize;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor + "80",
          width: backgroundSize,
          height: backgroundSize,
          borderRadius: square ? backgroundSize / 2 - 6 : backgroundSize / 2,
        },
      ]}
    >
      <View>
        <Icon
          name={icon}
          color={iconColor}
          size={iconSize}
          fill="transparent"
        />
      </View>
    </View>
  );
};

export default IconBackground;
