import { Button, ButtonGroup, ButtonText } from "@/src/components/ui/button";
import { C } from "@/src/theme";
import { TextStyle, View } from "react-native";
import Icon from "../Icon";
export interface ButtonProps {
  onClick?: () => void;
  size?: "default" | "sm" | "lg" | "login";
}

const ButtonLogin = ({ onClick, size = "login" }: ButtonProps) => {
  const sizeStyles = {
    default: {
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    sm: {
      minHeight: 32,
      borderRadius: 6,
      paddingHorizontal: 12,
    },
    lg: {
      minHeight: 40,
      paddingHorizontal: 32,
    },
    login: {
      minHeight: 60,
      borderRadius: 14,
      paddingLeft: 32,
      paddingRight: 32,
    },
  };

  const variantColor = {
    primary: {
      backgroundColor: C.brand500,
      shadowColor: C.brand500,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 14,
      elevation: 8,
    },
  };

  const iconSizeStyles = {
    default: {
      height: 16,
      width: 16,
    },

    sm: {
      height: 12,
      width: 12,
    },

    lg: {
      height: 20,
      width: 20,
    },
    login: { height: 20, width: 20 },
  };

  const textSizeStyles: Record<
    Exclude<ButtonProps["size"], undefined>,
    TextStyle
  > = {
    default: { fontSize: 14 },
    sm: { fontSize: 12 },
    lg: { fontSize: 14 },
    login: { fontSize: 17, fontWeight: 700 },
  };

  return (
    <View>
      <ButtonGroup>
        <Button
          variant="default"
          onPress={onClick}
          style={{ ...sizeStyles[size], ...variantColor.primary }}
          // style={[sizeStyles[size], { backgroundColor: variantColor.primary }]}
        >
          <ButtonText className="font-medium" style={textSizeStyles[size]}>
            Entrar
          </ButtonText>
          <Icon name="ArrowRight" size={20} color="white" strokeWidth={2.2} />
          {/* <ArrowRight size={20} color={"white"} /> */}
        </Button>
      </ButtonGroup>
    </View>
  );
};

export default ButtonLogin;
