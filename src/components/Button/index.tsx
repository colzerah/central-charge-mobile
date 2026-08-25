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
}: ButtonProps) => {
  const getSize = () => {
    if (size === "sm") {
      return {
        height: 40,
        fontSize: 14,
        iconSize: 16,
      };
    }
    if (size === "md") {
      return {
        height: 48,
        fontSize: 17,
        iconSize: 20,
      };
    }
    if (size === "lg") {
      return {
        height: 56,
        fontSize: 20,
        iconSize: 24,
      };
    }
  };

  const getVariant = () => {
    if (variant === "link") {
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

  const isLink = variant === "link";

  const getBoxShadow = () => {
    if (!shadowBox) {
      return {};
    }
    if (Platform.OS === "android") {
      return {
        elevation: 12,
        boxShadow: `0px 6px 14px ${C.brand500}66`,
        borderRadius: 14,
      };
    }
    if (Platform.OS === "ios") {
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
        onPress={onPress}
        width={w}
        height={isLink ? 20 : getSize()?.height}
        isLoading={isLoading}
        loadingTextBackgroundColor={C.brand300}
        renderLoadingIndicator={() => activityIndicator}
        showLoadingIndicator={true}
        loadingText="Carregando..."
        loadingTextColor={C.white}
        loadingTextSize={getSize()?.fontSize}
        borderRadius={isLink ? 0 : 14}
        withPressAnimation
        loadingTextStyle={styles.loadingText}
        disabled={disabled}
        backgroundColor={disabled ? C.ink500 : getVariant()?.backgroundColor}
      >
        <View style={styles.iconView}>
          {iconLeft && !isLink && (
            <Icon name={iconLeft} size={getSize()?.iconSize} color={C.white} />
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
          {iconRight && !isLink && (
            <Icon name={iconRight} size={getSize()?.iconSize} color={C.white} />
          )}
        </View>
      </ButtonIX>
    </View>
  );
};

export default Button;
