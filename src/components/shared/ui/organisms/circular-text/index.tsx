// @ts-check
import React, { useEffect, useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  type ViewStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
  type SharedValue,
} from "react-native-reanimated";
import type {
  ICircularText,
  ICircularTextLetter,
  ICircularTextSegment,
  TPressEffect,
} from "./types";

const Letter = memo<ICircularTextLetter>(
  ({
    letter,
    angle: angleFromTop,
    radius,
    fontSize,
    color,
    containerSize,
    textStyle,
  }): React.ReactElement => {
    const angle: number = angleFromTop - 90;
    const angleRad: number = (angle * Math.PI) / 180;

    const x: number = radius * Math.cos(angleRad);
    const y: number = radius * Math.sin(angleRad);

    const letterRotation: number = angle + 90;

    return (
      <View
        style={[
          styles.letterContainer,
          {
            left: containerSize / 2,
            top: containerSize / 2,
            transform: [
              { translateX: x - fontSize / 2 },
              { translateY: y - fontSize / 2 },
              { rotate: `${letterRotation}deg` },
            ],
          },
        ]}
      >
        <Text
          style={[
            styles.letter,
            {
              fontSize,
              color,
              width: fontSize,
              height: fontSize * 1.2,
            },
            textStyle,
          ]}
        >
          {letter}
        </Text>
      </View>
    );
  },
);

export const CircularText: React.FC<ICircularText> = memo<ICircularText>(
  ({
    text = "",
    segments,
    spinDuration = 20,
    pressEffect = "accelerate",
    radius = 85,
    fontSize = 24,
    color = "#ffffff",
    style,
    textStyle,
  }: ICircularText): React.ReactElement => {
    const parts: readonly ICircularTextSegment[] = segments ?? [{ text }];
    const letters = parts.flatMap((part) =>
      Array.from(part.text).map((letter) => ({
        letter,
        fontSize: part.fontSize ?? fontSize,
        color: part.color ?? color,
        textStyle: [textStyle, part.textStyle],
      })),
    );

    // Cada letra ocupa um arco proporcional ao seu tamanho, para as
    // maiores não ficarem amontoadas. Com um tamanho só, o espaçamento
    // é igual para todas, como antes.
    const totalSize: number = letters.reduce((sum, l) => sum + l.fontSize, 0);
    const angles: number[] = letters.map(
      (_, index) =>
        (360 *
          letters.slice(0, index).reduce((sum, l) => sum + l.fontSize, 0)) /
        totalSize,
    );
    const maxFontSize: number = Math.max(...letters.map((l) => l.fontSize));

    const rotation: SharedValue<number> = useSharedValue<number>(0);

    const startRotation = useCallback(
      (duration: number): void => {
        cancelAnimation(rotation);

        const currentRotation: number = rotation.value % 360;
        rotation.value = currentRotation;

        rotation.value = withRepeat(
          withTiming(currentRotation + 360, {
            duration: duration * 1000,
            easing: Easing.linear,
          }),
          -1,
          false,
        );
      },
      [rotation],
    );

    useEffect((): (() => void) => {
      startRotation(spinDuration);
      return (): void => {
        cancelAnimation(rotation);
      };
    }, [spinDuration, startRotation, rotation]);

    const handlePressIn = useCallback((): void => {
      if (!pressEffect) return;

      switch (pressEffect) {
        case "slowDown":
          startRotation(spinDuration * 2);
          break;
        case "accelerate":
          startRotation(spinDuration / 4);
          break;
        case "pause":
          cancelAnimation(rotation);
          break;
        default: {
          const _exhaustiveCheck: never = pressEffect;
          return _exhaustiveCheck;
        }
      }
    }, [pressEffect, spinDuration, startRotation, rotation]);

    const handlePressOut = useCallback((): void => {
      startRotation(spinDuration);
    }, [spinDuration, startRotation]);

    const animatedContainerStyle = useAnimatedStyle((): ViewStyle => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const containerSize: number = radius * 2 + maxFontSize * 2;

    return (
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.container,
            {
              width: containerSize,
              height: containerSize,
            },
            animatedContainerStyle,
            style,
          ]}
        >
          {letters.map((item, index: number): React.ReactElement => (
            <Letter
              key={index}
              letter={item.letter}
              angle={angles[index]}
              radius={radius}
              fontSize={item.fontSize}
              color={item.color}
              containerSize={containerSize}
              textStyle={item.textStyle}
            />
          ))}
        </Animated.View>
      </Pressable>
    );
  },
);

export default memo<React.FC<ICircularText>>(CircularText);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  letterContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontWeight: "900",
    textAlign: "center",
  },
});

export type {
  ICircularText,
  ICircularTextLetter,
  ICircularTextSegment,
  TPressEffect,
};
