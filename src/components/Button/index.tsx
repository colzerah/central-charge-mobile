import { Button as ButtonIX } from "@/src/components/shared/ui/base/button";
import { C } from "@/src/theme";
import { ActivityIndicator, Platform, Text, View } from "react-native";
import Icon from "../Icon";
import { ButtonProps } from "./ButtonDTO";
import { styles } from "./styles";

const Button = ({
  onPress,
  variant = "solid",
  disabled,
  isLoading,
  shadowBox = false,
  w = 300,
  title,
  iconLeft,
  iconRight,
  size = "md",
  loadingText = "Carregando...",
}: ButtonProps) => {
  const isLink = variant === "link";
  const isAndroid = Platform.OS === "android";
  const borderRadius = isLink ? 0 : 14;

  const getSize = () => {
    if (size === "sm") {
      return {
        height: isLink ? 20 : 40,
        fontSize: 14,
        iconSize: 16,
      };
    }
    if (size === "md") {
      return {
        height: isLink ? 24 : 48,
        fontSize: 17,
        iconSize: 20,
      };
    }
    if (size === "lg") {
      return {
        height: isLink ? 28 : 56,
        fontSize: 20,
        iconSize: 24,
      };
    }
  };

  const getVariant = () => {
    if (disabled) {
      return {
        backgroundColor: "transparent",
        color: C.disabled500 + "40",
      };
    }
    if (isLink) {
      return {
        backgroundColor: "transparent",
        color: C.brand500,
      };
    }

    return {
      backgroundColor: C.brand500,
      color: C.white,
    };
  };

  const getBoxShadow = () => {
    if (!shadowBox) {
      return {};
    }
    if (isAndroid) {
      return {
        elevation: 12,
        boxShadow: `0px 6px 14px ${C.brand500}66`,
        borderRadius: 14,
      };
    }
    if (!isAndroid) {
      return {
        shadowColor: C.brand500,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 14,
        elevation: 12,
      };
    }
  };

  const activityIndicator = (
    <ActivityIndicator
      color={C.white}
      style={{ width: 18, height: 18, marginRight: 6 }}
    />
  );

  return (
    <View style={getBoxShadow()}>
      <ButtonIX
        isLoading={isLoading}
        loadingText={loadingText}
        disabled={disabled}
        width={w}
        onPress={onPress}
        loadingTextColor={C.white}
        loadingTextBackgroundColor={C.brand300}
        loadingTextStyle={styles.loadingText}
        borderRadius={borderRadius}
        height={getSize()?.height}
        loadingTextSize={getSize()?.fontSize}
        backgroundColor={getVariant()?.backgroundColor}
        renderLoadingIndicator={() => activityIndicator}
        showLoadingIndicator={true}
        withPressAnimation
      >
        <View style={styles.iconView}>
          {iconLeft && (
            <Icon
              name={iconLeft}
              size={getSize()?.iconSize}
              color={getVariant()?.color}
            />
          )}
          <Text
            style={[
              styles.titleText,
              {
                color: getVariant()?.color,
                fontSize: getSize()?.fontSize,
              },
            ]}
          >
            {title}
          </Text>
          {iconRight && (
            <Icon
              name={iconRight}
              size={getSize()?.iconSize}
              color={getVariant()?.color}
            />
          )}
        </View>
      </ButtonIX>
    </View>
  );
};

export default Button;
