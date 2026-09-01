import { Text, View } from "react-native";
import { DividerProps } from "./DividerDTO";
import { dividerStyles } from "./styles";

const DividerHorizontal = ({ title, mt, mb }: DividerProps) => {
  //usar o type para divisao de hor e vert

  return (
    <View
      style={[dividerStyles.dividerRow, { marginTop: mt, marginBottom: mb }]}
    >
      <View style={[dividerStyles.divider]} />
      {title && <Text style={dividerStyles.dividerText}>{title}</Text>}
      <View style={[dividerStyles.divider]} />
    </View>
  );
};

export default DividerHorizontal;
