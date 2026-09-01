import { View } from "react-native";
import { DividerProps } from "./DividerDTO";
import { dividerStyles } from "./styles";

const DividerVertical = ({}: DividerProps) => {
  //usar o type para divisao de hor e vert

  return (
    <View style={[dividerStyles.dividerColumn, { flex: 1 }]}>
      <View style={[dividerStyles.dividerVertical]} />
    </View>
  );
};

export default DividerVertical;
