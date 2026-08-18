import { Text, TouchableOpacity, View } from "react-native";
import Apple from "./Icons/apple.svg";
import Chrome from "./Icons/chrome.svg";
import Facebook from "./Icons/facebook.svg";

import { SocialButtonProps } from "./SocialButtonDTO";
import { styles } from "./styles";

const SocialButton = ({ type, label, onPress }: SocialButtonProps) => {
  const icon = {
    facebook: <Facebook width={22} height={22} />,
    chrome: <Chrome width={22} height={22} />,
    apple: <Apple width={22} height={22} />,
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
