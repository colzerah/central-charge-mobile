import type { StyleProp, TextStyle, ViewStyle } from "react-native";

type TPressEffect = "accelerate" | "slowDown" | "pause" | null;

// Trecho do texto com tamanho/cor próprios (ex.: destacar o nome do app)
interface ICircularTextSegment {
  readonly text: string;
  readonly fontSize?: number;
  readonly color?: string;
  readonly textStyle?: StyleProp<TextStyle>;
}

interface ICircularText {
  // Use `text` para um texto uniforme ou `segments` para misturar tamanhos
  readonly text?: string;
  readonly segments?: readonly ICircularTextSegment[];
  readonly spinDuration?: number;
  readonly pressEffect?: TPressEffect;
  readonly radius?: number;
  readonly fontSize?: number;
  readonly color?: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
}

interface ICircularTextLetter {
  readonly letter: string;
  // posição no círculo, em graus a partir do topo
  readonly angle: number;
  readonly radius: number;
  readonly fontSize: number;
  readonly color: string;
  readonly containerSize: number;
  readonly textStyle?: StyleProp<TextStyle>;
}

export type {
  ICircularText,
  ICircularTextLetter,
  ICircularTextSegment,
  TPressEffect,
};
