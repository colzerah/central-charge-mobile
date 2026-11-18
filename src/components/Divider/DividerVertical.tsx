import { useThemedStyles } from "@/src/hooks/useTheme";
import { View } from "react-native";
import { DividerProps } from "./DividerDTO";
import { makeDividerStyles } from "./styles";

const DividerVertical = ({ h = 30 }: DividerProps) => {
  const dividerStyles = useThemedStyles(makeDividerStyles);
  //usar o type para divisao de hor e vert

  return (
    <View style={dividerStyles.dividerColumn}>
      <View style={[dividerStyles.dividerVertical, { height: h }]} />
    </View>
  );
};

export default DividerVertical;
