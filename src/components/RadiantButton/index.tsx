import { RadiantButton as ButtonIX } from "@/src/components/shared/ui/base/radiant-button";
import { C } from "@/src/theme";
import * as icons from "lucide-react-native/icons";

import { Text, View } from "react-native";
import Icon from "../Icon";
export interface ButtonProps {
  onPress?: () => void;
  title?: string;
  w?: number;
  h?: number;
  iconName?: keyof typeof icons;
  rightIcon?: boolean;
  leftIcon?: boolean;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const RadiantButton = ({
  onPress,
  disabled = false,
  title = "Lorem",
  rightIcon,
  leftIcon,
  iconName = "ArrowRight",
  w = 304,
  h = 56,
}: ButtonProps) => {
  const defaultTheme = {
    background: C.brand500,
    backgroundSubtle: C.brand700,
    foreground: C.white,
    highlight: C.brand400,
    highlightSubtle: C.brand300,
  };

  const disabledTheme = {
    background: C.brand500,
    backgroundSubtle: C.brand700,
    foreground: C.white,
    highlight: C.brand400,
    highlightSubtle: C.brand300,
  };

  const shadowStyle = {
    shadowColor: C.brand500,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  };

  return (
    <View style={disabled ? {} : shadowStyle}>
      <ButtonIX
        theme={disabled ? disabledTheme : defaultTheme}
        onPress={onPress}
        borderRadius={14}
        shimmerOpacity={1}
        showDots={false}
        glowBlur={100}
        glowWidth={1}
        style={{
          backgroundColor: disabled ? C.ink500 : C.brand500,
          height: h,
          width: w,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {leftIcon && (
            <View>
              <Icon name={iconName} size={20} color={C.white} />
            </View>
          )}
          <Text
            style={{
              color: C.white,
              fontSize: 17,
              fontWeight: "700",
              fontFamily: "Inter-Bold",
            }}
          >
            {title}
          </Text>
          {rightIcon && (
            <View>
              <Icon name={iconName} size={20} color={C.white} />
            </View>
          )}
        </View>
      </ButtonIX>
    </View>
  );
};

export default RadiantButton;
