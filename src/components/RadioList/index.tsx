import { C } from "@/src/theme";
import { Pressable, Text, View } from "react-native";
import Icon from "../Icon";
import { RadioListProps } from "./RadioListDTO";
import { styles } from "./styles";

// Lista de opções com seleção única (ex.: tipo de problema)
const RadioList = <T extends string>({
  label,
  options,
  value,
  onChange,
}: RadioListProps<T>) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.list} accessibilityRole="radiogroup">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <Pressable
              key={option.value}
              style={[styles.option, selected && styles.optionSelected]}
              onPress={() => onChange(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
            >
              {option.icon && (
                <Icon
                  name={option.icon}
                  size={18}
                  color={selected ? C.brand400 : C.ink400}
                />
              )}
              <Text
                style={[styles.optionText, selected && styles.optionTextSelected]}
              >
                {option.label}
              </Text>
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <View style={styles.radioDot} />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default RadioList;
