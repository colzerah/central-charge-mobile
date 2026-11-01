import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Checkbox as CheckboxUX } from "../shared/ui/organisms/check-box";

import { C } from "@/src/theme";
import { PADDING, VIEWPORT_SIZE } from "../shared/ui/organisms/check-box/conf";
import { CheckBoxProps } from "./CheckBoxDTO";
import { checkBoxStyles } from "./styles";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const VIEWBOX = VIEWPORT_SIZE + PADDING; // 84
const BOX = 63;

const CheckBox = ({
  size = 50,
  bgColor,
  onPress,
  borderW = 4,
  isCheck,
  isReadOnly = false,
}: CheckBoxProps) => {
  // Controlado quando o pai passa isCheck; senão usa o estado interno
  const [internalChecked, setInternalChecked] = useState(isCheck ?? false);
  const isControlled = isCheck !== undefined;
  const checked = isControlled ? isCheck : internalChecked;
  const scale = useSharedValue(1);

  const withBgColor = checked && bgColor ? true : false;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = useCallback(() => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300, mass: 0.5 });
  }, [scale]);

  const onPressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 250, mass: 0.5 });
  }, [scale]);

  const handlePress = useCallback(() => {
    const next = !checked;
    if (!isControlled) setInternalChecked(next);
    onPress?.(next);
  }, [checked, isControlled, onPress]);

  const getCheckBoxContainerSize = (size: number, stroke = 4) => {
    const box = (size * (BOX - stroke)) / VIEWBOX;
    return {
      width: box,
      height: box,
      borderRadius: size * 0.16,
    };
  };

  return (
    <View>
      <View style={checkBoxStyles.stage}>
        <View style={checkBoxStyles.demo}>
          <AnimatedPressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked, disabled: isReadOnly }}
            disabled={isReadOnly}
            hitSlop={12}
            onPress={handlePress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={animatedStyle}
          >
            <View
              style={[
                checkBoxStyles.checkBoxContainer,
                getCheckBoxContainerSize(size, 4),
                { backgroundColor: withBgColor ? bgColor : C.ink100 },
              ]}
            >
              <CheckboxUX
                checked={checked}
                showBorder={checked ? false : true}
                checkmarkColor={checked ? C.white : C.ink200}
                size={size}
                stroke={borderW}
              />
            </View>
          </AnimatedPressable>
        </View>
      </View>
    </View>
  );
};

export default CheckBox;
