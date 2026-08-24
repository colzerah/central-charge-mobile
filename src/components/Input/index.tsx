import { C } from "@/src/theme";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { InputProps } from "./InputDTO";
import { inputStyles } from "./styles";

const Input = ({
  onChange,
  value,
  w = "90%",
  label,
  placeholder,
  enterKeyHint = "next",
  size = "md",
  isInvalid,
  keyboardType,
  textContentType = "none",
  isDisabled,
}: InputProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const placeHolderText = () => {
    if (placeholder) {
      return placeholder;
    }
    if (textContentType === "emailAddress") {
      return "voce@exemplo.com";
    }
    if (textContentType === "password") {
      return "••••••••";
    }
    return "Digite aqui";
  };

  const getSize = () => {
    if (size === "sm") {
      return {
        inputHeight: 38,
        iconSize: 14,
      };
    }
    if (size === "md") {
      return {
        inputHeight: 56,
        iconSize: 20,
      };
    }
    if (size === "lg") {
      return {
        inputHeight: 64,
        iconSize: 24,
      };
    }
  };

  const getFocused = () => {
    if (isDisabled) {
      return {
        borderColor: C.disabled500,
        backgroundColor: C.disabled400 + 50,
      };
    }
    if (!!isInvalid) {
      return {
        borderColor: C.borderErrorFocused,
        backgroundColor: C.borderError + 20,
      };
    }
    if (focused) {
      return {
        borderColor: C.borderFocused,
        backgroundColor: C.ink50,
      };
    }
    return { borderColor: C.border, backgroundColor: C.ink50 };
  };

  const placeHolderTextColor = () => {
    if (!!isDisabled) {
      return C.disabled500;
    }
    if (!!isInvalid) {
      return C.placeholderInvalid;
    }
    return C.placeholder;
  };

  const getIconColor = (eyes?: boolean) => {
    if (!!isDisabled) {
      return C.disabled500;
    }
    if (!!isInvalid) {
      return C.iconColorInvalid;
    }
    if (eyes) {
      return C.ink400;
    }
    return C.brand500;
  };

  return (
    <View style={[inputStyles.field, { width: w }]}>
      {label && <Text style={inputStyles.label}>{label}</Text>}
      <View
        style={[
          inputStyles.inputWrap,
          { height: getSize()?.inputHeight, ...getFocused() },
        ]}
      >
        {textContentType === "emailAddress" && (
          <Mail
            color={getIconColor()}
            size={getSize()?.iconSize}
            style={inputStyles.inputIcon}
          />
        )}

        {textContentType === "password" && (
          <Lock
            color={getIconColor()}
            size={getSize()?.iconSize}
            style={inputStyles.inputIcon}
          />
        )}
        <TextInput
          secureTextEntry={showPassword}
          editable={!isDisabled} // disabled
          enterKeyHint={enterKeyHint}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          cursorColor={C.ink200}
          selectionColor={C.ink200}
          style={inputStyles.input}
          placeholder={placeHolderText()}
          placeholderTextColor={placeHolderTextColor()}
          value={value}
          onChangeText={onChange}
          autoCapitalize="none"
          keyboardType={keyboardType}
          textContentType={textContentType}
        />
        {textContentType === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((s) => !s)}
            style={inputStyles.eyeBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {showPassword ? (
              <EyeOff color={getIconColor(true)} size={getSize()?.iconSize} />
            ) : (
              <Eye color={getIconColor(true)} size={getSize()?.iconSize} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
