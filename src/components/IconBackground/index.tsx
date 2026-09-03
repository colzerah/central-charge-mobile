import { View } from "react-native";
import Icon from "../Icon";
import { IconBackgroundProps } from "./IconBackgroundDTO";
import { styles } from "./styles";

const IconBackground = ({
  icon,
  backgroundColor = "red",
  size = "sm",
  square = false,
  iconColor = "red",
  strokeWidth,
}: IconBackgroundProps) => {
  const getSize = () => {
    if (size === "sm") {
      return {
        bgSize: 36,
        iconSize: 19,
      };
    }
    if (size === "md") {
      return {
        bgSize: 46,
        iconSize: 23,
      };
    }
    if (size === "lg") {
      return {
        bgSize: 48,
        iconSize: 24,
      };
    }

    throw new Error(`Unsupported IconBackground size: ${size}`);
  };

  const componentSize = getSize();
  const borderRadius = square
    ? componentSize.bgSize / 2 - 6
    : componentSize.bgSize / 2;

  return (
    <View
      style={[
        styles.container,
        {
          width: componentSize.bgSize,
          height: componentSize.bgSize,
          borderRadius,
        },
      ]}
    >
      <View
        style={{
          ...styles.background,
          backgroundColor,
          borderRadius,
        }}
      />
      <View>
        <Icon
          name={icon}
          color={iconColor}
          size={componentSize.iconSize}
          fill="transparent"
          strokeWidth={strokeWidth}
        />
      </View>
    </View>
  );
};

export default IconBackground;
