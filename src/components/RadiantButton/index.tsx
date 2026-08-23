import { RadiantButton as ButtonRRadix } from "@/src/components/shared/ui/base/radiant-button";
import { C } from "@/src/theme";
import { Text, View } from "react-native";
import Icon from "../Icon";
export interface ButtonProps {
  onPress?: () => void;
  size?: "default" | "sm" | "lg" | "login";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

const RadiantButton = ({ onPress, size = "login", variant }: ButtonProps) => {
  const disabled = true;

  const defaultTheme = {
    background: "#000000",
    backgroundSubtle: "#1a1a1a",
    foreground: "#ffffff",
    highlight: "#c084fc",
    highlightSubtle: "#a855f7",
  };

  const testeTheme = {
    background: "#3a2714",

    backgroundSubtle: "#6b441e",

    foreground: C.white,

    highlight: C.brand500,

    highlightSubtle: C.brand700,
  };

  const testeTheme2 = {
    background: C.brand500,

    backgroundSubtle: C.brand700,

    foreground: C.white,

    highlight: C.brand400,

    highlightSubtle: C.brand300,
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
      <ButtonRRadix
        theme={testeTheme2}
        onPress={onPress}
        borderRadius={14}
        style={{
          backgroundColor: disabled ? C.brand500 : C.ink500,
        }}
        paddingHorizontal={68}
        paddingVertical={16}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 28,
            gap: 14,
          }}
        >
          <Text
            style={{
              color: C.white,
              fontSize: 17,
              fontWeight: "700",
              fontFamily: "Inter-Bold",
            }}
          >
            Entrares
          </Text>
          <Icon name="ArrowRight" size={24} color={C.white} />
        </View>
      </ButtonRRadix>
    </View>
  );
};

export default RadiantButton;
