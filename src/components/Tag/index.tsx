import { C } from "@/src/theme";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { TagProps } from "./TagDTO";

const typeMap = {
  default: C.brand400,
  info: C.info,
  danger: C.error,
  success: C.success,
  warning: C.warning,
};

const Tag = ({ title, type = "default" }: TagProps) => {
  const colors = typeMap[type] || typeMap.default;
  const textColor = colors;
  const bgColor = colors + "20";
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.dot, { backgroundColor: textColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </View>
  );
};

export default Tag;
