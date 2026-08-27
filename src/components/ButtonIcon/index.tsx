import { Button as ButtonIX } from "@/src/components/shared/ui/base/button";
import { C } from "@/src/theme";
import { View } from "react-native";
import Icon from "../Icon";
import { ButtonIconProps } from "./ButtonIconDTO";

const ButtonIcon = ({
  onPress,
  variant = "solid",
  disabled,
  icon = "Star",
  size = "md",
}: ButtonIconProps) => {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 54, height: 54 },
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

  //ajustar padronizar como o button

  return (
    <View>
      <ButtonIX
        style={{ opacity: disabled ? 0.5 : 1 }}
        onPress={onPress}
        width={sizes[size].width}
        height={sizes[size].height}
        borderRadius={size === "sm" ? 20 : 14}
        withPressAnimation
        disabled={disabled}
        backgroundColor={backgroundColor()}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
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
