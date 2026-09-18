// @ts-ignore
import React, { memo, useCallback, useMemo } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Canvas, Shader, Skia, Fill, vec } from "@shopify/react-native-skia";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { SHADER as MESH_GRADIENT_SHADER } from "./conf";
import { DEFAULT_INITIAL_COLORS, DEFAULT_PERFORMANCE } from "./const";
import type { IAnimatedMeshGradient, IMeshGradientColor } from "./types";
import { useFrameTime } from "./useFrameTime";

const shader = Skia.RuntimeEffect.Make(MESH_GRADIENT_SHADER);

export const AnimatedMeshGradient: React.FC<IAnimatedMeshGradient> &
  React.FunctionComponent<IAnimatedMeshGradient> = memo<
  IAnimatedMeshGradient & React.ComponentProps<typeof View>
>(
  ({
    colors = DEFAULT_INITIAL_COLORS,
    speed = 1,
    noise = 0.15,
    blur = 0.4,
    contrast = 1,
    animated = true,
    active = true,
    style,
    width: paramsWidth = Dimensions.get("window").width,
    height: paramsHeight = Dimensions.get("window").height,
    performance,
    children,
  }: IAnimatedMeshGradient &
    React.ComponentProps<typeof AnimatedMeshGradient>):
    | (React.ReactNode & React.JSX.Element & React.ReactElement)
    | null => {
    const width = useSharedValue<number>(paramsWidth ?? 1);
    const height = useSharedValue<number>(paramsHeight ?? 1);
    const scale =
      performance?.undersampling ?? DEFAULT_PERFORMANCE.undersampling;

    const time = useFrameTime({
      fpsLock: performance?.fpsLock ?? DEFAULT_PERFORMANCE.fpsLock,
      animated: animated && active,
      speed,
    });

    const safeColors = useMemo<IMeshGradientColor[]>(() => {
      const result = [...colors];
      while (result.length < 4) {
        result.push(
          DEFAULT_INITIAL_COLORS[result.length % DEFAULT_INITIAL_COLORS.length],
        );
      }
      return result.slice(0, 4);
    }, [colors]);

    // Static approximation of the mesh, rendered as a plain LinearGradient.
    // It paints synchronously with layout (no GPU surface/shader compile
    // round-trip like the Skia canvas below), so it's what's actually on
    // screen for the frame or two before the animated canvas takes over —
    // matching colors means that handoff is invisible instead of a flash.
    const gradientColors = useMemo(
      () =>
        safeColors.map(
          (c) =>
            `rgb(${Math.round(c.r * 255)}, ${Math.round(c.g * 255)}, ${Math.round(c.b * 255)})`,
        ) as [string, string, ...string[]],
      [safeColors],
    );

    const uniforms = useDerivedValue(() => {
      return {
        resolution: vec(
          Math.round(width.value * scale),
          Math.round(height.value * scale),
        ),
        time: time.value,
        noise: Math.max(0, Math.min(1, noise)),
        blur: Math.max(0, Math.min(1, blur)),
        contrast: Math.max(0, Math.min(2, contrast)),
        color1: [safeColors[0].r, safeColors[0].g, safeColors[0].b, 1],
        color2: [safeColors[1].r, safeColors[1].g, safeColors[1].b, 1],
        color3: [safeColors[2].r, safeColors[2].g, safeColors[2].b, 1],
        color4: [safeColors[3].r, safeColors[3].g, safeColors[3].b, 1],
      };
    }, [width, height, noise, blur, contrast, safeColors, time]);

    const canvasWrapperStyle = useAnimatedStyle<
      Required<
        Partial<
          Pick<
            ViewStyle,
            | "position"
            | "top"
            | "left"
            | "width"
            | "height"
            | "transform"
            | "transformOrigin"
            | "zIndex"
          >
        >
      >
    >(() => ({
      position: "absolute",
      top: 0,
      left: 0,
      width: Math.round(width.value * scale),
      height: Math.round(height.value * scale),
      transform: [{ scale: 1 / scale }],
      transformOrigin: "left top",
      zIndex: -9999,
    }));

    const onLayout = useCallback(
      (e: LayoutChangeEvent) => {
        const w = e.nativeEvent.layout.width;
        const h = e.nativeEvent.layout.height;
        width.value = w < 1 ? 1 : w;
        height.value = h < 1 ? 1 : h;
      },
      [width, height],
    );

    if (!shader) {
      return (
        <View
          style={[
            styles.container,
            style,
            { width: width.value, height: height.value },
          ]}
        >
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          style,
          { width: paramsWidth, height: paramsHeight },
        ]}
        onLayout={onLayout}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill, styles.staticGradient]}
        />

        {children}

        {/* Always mounted once the shader compiles — unmounting this on
            blur/focus (e.g. via `active`) forces Skia to recreate the GPU
            surface each time the screen refocuses, which visibly pops
            against the static gradient above. useFrameTime already stops
            advancing the animation while `active` is false, so leaving the
            canvas mounted costs nothing extra and avoids that pop. */}
        <Animated.View style={canvasWrapperStyle}>
          <Canvas style={StyleSheet.absoluteFill}>
            <Fill>
              <Shader source={shader} uniforms={uniforms} />
            </Fill>
          </Canvas>
        </Animated.View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  staticGradient: {
    zIndex: -10000,
  },
});

export default memo<
  React.FC<IAnimatedMeshGradient> &
    React.FunctionComponent<IAnimatedMeshGradient> &
    Required<React.ComponentProps<typeof AnimatedMeshGradient>>
>(AnimatedMeshGradient);
