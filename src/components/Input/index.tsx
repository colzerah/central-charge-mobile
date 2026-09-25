import { C } from "@/src/theme";
import { pressableOpacity } from "@/src/utils/pressable";
import { Lock, Mail } from "lucide-react-native";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Icon from "../Icon";
import IconBackground from "../IconBackground";
import { InputProps } from "./InputDTO";
import { inputStyles } from "./styles";

const Input = ({
  onChange,
  value,
  w = "100%",
  label,
  placeholder,
  enterKeyHint = "next",
  size = "md",
  isInvalid,
  keyboardType,
  textContentType = "none",
  isDisabled,
  isFocused,
  variant = "default",
  leftIcon,
  iconColor,
  iconBg,
}: InputProps) => {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [skeletonHeight, setSkeletonHeight] = useState<number | undefined>(
    undefined,
  );
  const [showPassword, setShowPassword] = useState(
    textContentType === "password" ? true : false,
  );

  // Foca o input sempre que a tela ganha foco (inclusive ao voltar para ela)
  useFocusEffect(
    useCallback(() => {
      if (!isFocused || isDisabled) return;
      const timeout = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timeout);
    }, [isFocused, isDisabled]),
  );

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
    if (iconColor) {
      return iconColor;
    }
    return C.brand500;
  };

  const getIconBgColor = () => {
    if (iconBg) {
      return iconBg;
    }
    return "transparent";
  };

  const getBackgroundColor = () => {
    if (variant === "outline") {
      return C.ink100;
    }

    return "transparent";
  };

  return (
    <View
      style={{ width: w }}
      onLayout={(e) => setSkeletonHeight(e.nativeEvent.layout.height)}
    >
      {label && <Text style={inputStyles.label}>{label}</Text>}
      <View
        style={[
          inputStyles.inputWrap,
          {
            height: getSize()?.inputHeight,
            ...getFocused(),
            backgroundColor: getBackgroundColor(),
          },
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
        {leftIcon &&
          textContentType !== "password" &&
          textContentType !== "emailAddress" && (
            <View style={inputStyles.inputIcon}>
              <IconBackground
                icon={leftIcon}
                square
                backgroundColor={getIconBgColor()}
                iconColor={getIconColor()}

                // color={getIconColor()}
                // size={getSize()?.iconSize}
              />
            </View>
          )}
        <TextInput
          ref={inputRef}
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
          <Pressable
            onPress={() => setShowPassword((s) => !s)}
            style={({ pressed }) => [
              inputStyles.eyeBtn,
              {
                opacity: pressableOpacity(pressed),
              },
            ]}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {showPassword ? (
              <Icon
                name="Eye"
                color={getIconColor(true)}
                size={getSize()?.iconSize}
              />
            ) : (
              <Icon
                name="EyeOff"
                color={getIconColor(true)}
                size={getSize()?.iconSize}
              />
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default Input;
