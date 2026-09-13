import { C } from "@/src/theme";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { TagProps } from "./TagDTO";

//padronizar com o button

const Tag = ({
  title,
  type = "default",
  size = "sm",
  border,
  dot,
}: TagProps) => {
  const typeMap = {
    default: C.brand400,
    info: C.info,
    danger: C.error,
    success: C.success,
    warning: C.warning,
    gray: C.ink500,
  };
  const colors = typeMap[type] || typeMap.default;
  const textColor = colors;
  const bgColor = colors + "20";

  const pv = {
    md: 8,
    sm: 4,
  };

  const fontSize = {
    md: 14,
    sm: 10,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          paddingVertical: pv[size],
          borderWidth: border ? 1 : 0,
          borderColor: colors,
        },
      ]}
    >
      {dot && <View style={[styles.dot, { backgroundColor: textColor }]} />}
      <Text
        style={[styles.text, { color: textColor, fontSize: fontSize[size] }]}
      >
        {title}
      </Text>
    </View>
  );
};

export default Tag;
