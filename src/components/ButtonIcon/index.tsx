import { Button as ButtonIX } from "@/src/components/shared/ui/base/button";
import { C } from "@/src/theme";
import { View } from "react-native";
import Icon from "../Icon";
import { ButtonIconProps } from "./ButtonIconDTO";
import { styles } from "./styles";

const ButtonIcon = ({
  onPress,
  variant = "solid",
  disabled,
  icon = "Star",
  size = "md",
}: ButtonIconProps) => {
  const getSizes = () => {
    if (size === "sm") {
      return {
        width: 40,
        height: 40,
      };
    }
    if (size === "md") {
      return {
        width: 54,
        height: 54,
      };
    }
  };

  const iconColor = () => {
    if (disabled) {
      return C.white;
    }
    if (variant === "outline") {
      return C.brand400;
    }
    if (variant === "solid") {
      return C.white;
    }
    return C.white;
  };

  const backgroundColor = () => {
    if (disabled) {
      return C.disabled500;
    }
    if (variant === "outline") {
      return C.ink100 + "80";
    }
    if (variant === "solid") {
      return C.brand500;
    }
    return C.brand500;
  };

  const disabledOpacity = { opacity: disabled ? 0.5 : 1 };
  const borderRadius = size === "sm" ? 20 : 14;

  return (
    <View>
      <ButtonIX
        style={disabledOpacity}
        width={getSizes()?.width}
        height={getSizes()?.height}
        borderRadius={borderRadius}
        onPress={onPress}
        disabled={disabled}
        withPressAnimation
        backgroundColor={backgroundColor()}
      >
        <View style={styles.iconView}>
          <Icon
            name={icon}
            size={size === "sm" ? 18 : 22}
            color={iconColor()}
          />
        </View>
      </ButtonIX>
    </View>
  );
};

export default ButtonIcon;
