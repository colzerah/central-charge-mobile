import { C } from "@/src/theme";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { TextAreaProps } from "./TextAreaDTO";

// Campo de texto de várias linhas, com contador quando há maxLength
const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
}: TextAreaProps) => {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        placeholder={placeholder}
        placeholderTextColor={C.placeholder}
        multiline
        maxLength={maxLength}
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {maxLength !== undefined && (
        <Text style={styles.counter}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

export default TextArea;
