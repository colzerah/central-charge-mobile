import { Text, View } from "react-native";
import { DividerProps } from "./DividerDTO";
import { dividerStyles } from "./styles";

const Divider = ({ title, type = "VERTICAL" }: DividerProps) => {
  //usar o type para divisao de hor e vert
  //coloca 3 tamanhos de divider sm, lg e md
  //colocar atributos de mt e mb dinamico para o divider conseguir afastar outros componenters

  return (
    <View style={dividerStyles.dividerRow}>
      <View style={dividerStyles.divider} />
      {/* <Text style={dividerStyles.dividerText}>ou continue com</Text> */}
      {title && <Text style={dividerStyles.dividerText}>{title}</Text>}
      <View style={dividerStyles.divider} />
    </View>
  );
};

export default Divider;
