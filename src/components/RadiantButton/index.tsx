import { RadiantButton as ButtonIX } from "@/src/components/shared/ui/base/radiant-button";
import { C } from "@/src/theme";

import { ActivityIndicator, Text, View } from "react-native";
import Icon from "../Icon";
import { ButtonProps } from "./RadiantButtonDTO";
import {
  defaultTheme,
  disabledTheme,
  radiantButtonStyles,
  shadowStyle,
} from "./styles";

const RadiantButton = ({
  onPress,
  disabled = false,
  title = "Lorem",
  rightIcon,
  leftIcon,
  iconName = "ArrowRight",
  w = 304,
  isLoading = false,
}: ButtonProps) => {
  const deactivate = disabled || isLoading;

  const loadingIndicator = (
    <ActivityIndicator
      color={C.white}
      style={radiantButtonStyles.activityIndicator}
    />
  );

  const viewChildren = (
    <View style={radiantButtonStyles.container}>
      {leftIcon && <Icon name={iconName} size={20} color={C.white} />}
      <Text style={radiantButtonStyles.text}>{title}</Text>
      {rightIcon && <Icon name={iconName} size={20} color={C.white} />}
    </View>
  );

  return (
    <View style={disabled ? {} : shadowStyle}>
      <ButtonIX
        disabled={deactivate}
        theme={disabled ? disabledTheme : defaultTheme}
        onPress={onPress}
        borderRadius={14}
        shimmerOpacity={1}
        showDots={false}
        showShimmer={disabled ? false : true}
        showGlow={disabled ? false : true}
        glowBlur={100}
        glowWidth={1}
        style={[
          radiantButtonStyles.button,
          {
            backgroundColor: disabled ? C.ink500 : C.brand500,
            width: w,
          },
        ]}
      >
        {isLoading ? loadingIndicator : viewChildren}
      </ButtonIX>
    </View>
  );
};

export default RadiantButton;
