import { useTheme } from "@/src/hooks/useTheme";
import { useIsFocused } from "expo-router";
import { useMemo } from "react";
import { AnimatedMeshGradient } from "../shared/ui/organisms/mesh-gradient";
import { IMeshGradientColor } from "../shared/ui/organisms/mesh-gradient/types";

// "#RRGGBB" → { r, g, b } de 0 a 1, formato que o shader do gradiente usa
const hexToRgb = (hex: string): IMeshGradientColor => ({
  r: parseInt(hex.slice(1, 3), 16) / 255,
  g: parseInt(hex.slice(3, 5), 16) / 255,
  b: parseInt(hex.slice(5, 7), 16) / 255,
});

// Paleta própria do claro. O olho percebe bem menos diferença entre tons
// claros do que entre escuros: no escuro ink0→ink200 dá ~23 de luminosidade
// percebida (L*), e para o claro ter o mesmo efeito precisa ir de branco até
// ~#BDBDC4. A ordem segue o escuro espelhado: o tom mais forte fica no canto
// de baixo à direita.
const LIGHT_GRADIENT = ["#F4F4F5", "#FFFFFF", "#D4D4D8", "#BDBDC4"];

const BackgroundGradient =({ children }: { children: React.ReactNode }) => {
  const isFocused = useIsFocused();

  const { colors: C, isDark } = useTheme();
  // Escuro: os 4 primeiros tons do tema (ink0 → ink200). Claro: LIGHT_GRADIENT.
  const colors: IMeshGradientColor[] = useMemo(
    () =>
      (isDark ? [C.ink0, C.ink50, C.ink100, C.ink200] : LIGHT_GRADIENT).map(
        hexToRgb,
      ),
    [C, isDark],
  );

  return (
    <AnimatedMeshGradient
      speed={2}
      // No claro: sem vinheta e contrast 0.5, que deixa a curva de gama do
      // shader neutra (expoente 1). Assim o branco não puxa para o cinza e
      // bate com o LinearGradient estático que aparece antes do shader.
      contrast={isDark ? 0.2 : 0.5}
      vignette={isDark ? 0.15 : 0}
      noise={0.3}
      blur={2}
      animated={true}
      active={isFocused}
      colors={colors}
    >
      {children}
    </AnimatedMeshGradient>
  );
};

export default BackgroundGradient;
