import { Button as ButtonIX } from "@/src/components/shared/ui/base/button";
import { C } from "@/src/theme";
import { ActivityIndicator, View } from "react-native";
import Icon from "../Icon";
export interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  variant?: "solid" | "outline";
}

const ButtonIcon = ({ onPress, variant, disabled }: ButtonProps) => {
  const iconColor = () => {
    if (disabled) {
      return C.disabled500;
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
      return C.disabled400;
    }
    if (variant === "outline") {
      return C.ink200;
    }
    if (variant === "solid") {
      return C.brand500;
    }
    return C.brand500;
  };

  return (
    <View
      style={{
        shadowColor: C.brand500,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 14,
        elevation: 8,
      }}
    >
      <ButtonIX
        onPress={onPress}
        width={56}
        height={56}
        isLoading={false}
        loadingTextBackgroundColor={C.brand300}
        renderLoadingIndicator={() => (
          <ActivityIndicator
            color={C.white}
            style={{ width: 18, height: 18, marginRight: 6 }}
          />
        )}
        showLoadingIndicator={true}
        loadingText="Carregando..."
        loadingTextColor={C.white}
        loadingTextSize={17}
        borderRadius={14}
        withPressAnimation
        loadingTextStyle={{
          color: C.white,
          fontSize: 17,
          fontWeight: "700",
          fontFamily: "Inter-Bold",
        }}
        disabled={disabled}
        backgroundColor={backgroundColor()}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Icon name="ArrowRight" size={24} color={iconColor()} />
        </View>
      </ButtonIX>
    </View>
  );
};

export default ButtonIcon;
