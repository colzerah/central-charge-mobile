import { Button as ButtonIX } from "@/src/components/shared/ui/base/button";
import { C } from "@/src/theme";
import { ActivityIndicator, View } from "react-native";
import Icon from "../Icon";
export interface ButtonProps {
  onPress?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const ButtonIcon = ({ onPress, variant }: ButtonProps) => {
  const disabled = true;

  const iconColor = () => {
    if (disabled) {
      return "gray";
    }

    if (variant === "outline") {
      return "red";
    }
    return "blue";
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
        // width={304}
        // height={56}

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
        backgroundColor={disabled ? C.brand500 : C.ink500}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Icon name="ArrowRight" size={24} color={iconColor()} />
        </View>
      </ButtonIX>
    </View>
  );
};

export default ButtonIcon;
