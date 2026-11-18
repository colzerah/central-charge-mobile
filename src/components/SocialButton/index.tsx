import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { Text, TouchableOpacity, View } from "react-native";
import Apple from "./Icons/apple.svg";
import Chrome from "./Icons/chrome.svg";
import Facebook from "./Icons/facebook.svg";

import { SocialButtonProps } from "./SocialButtonDTO";
import { makeSocialButtonStyles } from "./styles";

const SocialButton = ({ type, label, onPress }: SocialButtonProps) => {
  const { colors: C } = useTheme();
  const styles = useThemedStyles(makeSocialButtonStyles);

  const icon = {
    facebook: <Facebook width={22} height={22} />,
    chrome: <Chrome width={22} height={22} />,
    // o SVG da Apple usa currentColor: segue a cor do texto do tema
    apple: <Apple width={22} height={22} color={C.text} />,
  };

  return (
    <TouchableOpacity
      style={styles.socialBtn}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.socialIcon}>{icon[type]}</View>
      <Text style={styles.socialLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
