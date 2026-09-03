import React, { ReactNode, useState } from "react";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Shimmer } from "../shared/ui/molecules/shimmer";

interface SkeletonProps {
  children: ReactNode;
  w?: DimensionValue;
  h?: DimensionValue;
  br?: number;
  isLoading?: boolean;
  mb?: DimensionValue;
  styles?: ViewStyle;
}

const Skeleton = ({ isLoading = false, children, styles }: SkeletonProps) => {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setSize((prev) =>
      prev?.width === width && prev?.height === height
        ? prev
        : { width, height },
    );
  };

  // width/height saem da medicao (o tamanho real na tela); borderRadius,
  // margens e alignSelf so existem no style do children, entao vem dele
  const child = React.Children.toArray(children).find(React.isValidElement) as
    | React.ReactElement<{ style?: StyleProp<ViewStyle> }>
    | undefined;

  const childStyle = StyleSheet.flatten(child?.props?.style) ?? {};

  // primeira renderizacao carregando: ainda nao sabemos o tamanho real do
  // children, entao ele e montado invisivel so para ser medido
  if (isLoading && !size) {
    return (
      <View style={{ opacity: 0 }} pointerEvents="none" onLayout={onLayout}>
        {children}
      </View>
    );
  }

  return (
    <Shimmer
      isLoading={isLoading}
      style={{
        width: size?.width,
        height: size?.height,
        borderRadius: childStyle.borderRadius ?? 14,
        margin: childStyle.margin,
        marginHorizontal: childStyle.marginHorizontal,
        marginVertical: childStyle.marginVertical,
        marginTop: childStyle.marginTop,
        marginBottom: childStyle.marginBottom,
        marginLeft: childStyle.marginLeft,
        marginRight: childStyle.marginRight,
        alignSelf: childStyle.alignSelf,
        ...styles,
      }}
    >
      <View onLayout={onLayout}>{children}</View>
    </Shimmer>
  );
};

export default Skeleton;
