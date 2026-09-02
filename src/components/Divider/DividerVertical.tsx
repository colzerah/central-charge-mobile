import { View } from "react-native";
import { DividerProps } from "./DividerDTO";
import { dividerStyles } from "./styles";

const DividerVertical = ({ h = 30 }: DividerProps) => {
  //usar o type para divisao de hor e vert

  return (
    <View style={dividerStyles.dividerColumn}>
      <View style={[dividerStyles.dividerVertical, { height: h }]} />
    </View>
  );
};

export default DividerVertical;
