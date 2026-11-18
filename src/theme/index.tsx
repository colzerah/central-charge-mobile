// Paleta escura (a original do app). Componentes ainda não migrados para o
// tema dinâmico continuam importando `C` direto e por isso ficam sempre escuros.
export const C = {
  ink0: "#0A0A0B",
  ink50: "#18181B",
  ink100: "#27272A",
  ink200: "#3F3F46",
  ink300: "#52525B",
  ink400: "#71717A",
  ink500: "#A1A1AA",

  brand300: "#FB923C",
  brand400: "#F97316",
  brand500: "#F97316",
  brand600: "#EA580C",
  brand700: "#C2410C",
  white: "#FFFFFF",
  surface: "#EFEFEF",
  black: "#000000",
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  disabled400: "#A1A1AA",
  disabled500: "#1a1a1a",
  disabled600: "#27272A",

  borderFocused: "#71717A",
  border: "#3F3F46",
  borderError: "#EF4444",
  borderErrorFocused: "#EF4444",
  placeholder: "#71717A",
  placeholderInvalid: "#EF4444",
  iconColorInvalid: "#EF4444",

  tabBackgroud: "#101010",
  pressableOpacity: "rgb(210, 230, 255)",
};

export type AppTheme = "dark" | "light";

// Mesmos nomes nos dois temas. A escala ink é espelhada: no escuro ink0 é o
// fundo mais escuro; no claro, o fundo mais claro. `white` e `black` são
// sempre branco e preto de verdade; para texto use `text`.
export const darkColors = {
  ...C,
  // Cor principal de texto e ícones sobre o fundo
  text: "#FFFFFF",
  // Fundo de etiquetas pequenas dentro de cards (ex.: o kW do CardPlug)
  badgeBg: "#00000090",
  // Fundo e label do Input. No escuro o input é vazado sobre o gradiente.
  inputBg: "transparent",
  inputLabel: "#52525B",
  // Botão redondo "outline" (ButtonIcon): fundo translúcido, sem contorno
  iconButtonBg: "#27272A80",
  iconButtonBorder: "transparent",
};

export type ThemeColors = typeof darkColors;

export const lightColors: ThemeColors = {
  ...C,
  ink0: "#F4F4F5",
  ink50: "#FFFFFF",
  ink100: "#F1F1F3",
  ink200: "#E4E4E7",
  ink300: "#A1A1AA",
  ink400: "#71717A",
  ink500: "#52525B",

  surface: "#27272A",
  disabled400: "#A1A1AA",
  disabled500: "#E4E4E7",
  disabled600: "#F4F4F5",

  // Um tom acima do fundo, para o contorno de inputs e cards aparecer
  // sobre o branco
  borderFocused: "#71717A",
  border: "#D4D4D8",
  placeholder: "#A1A1AA",

  badgeBg: "#E4E4E7",
  // No claro o gradiente de fundo chega a #BDBDC4 embaixo e engole um input
  // vazado; com fundo branco ele se destaca em qualquer ponto da tela
  inputBg: "#FFFFFF",
  inputLabel: "#52525B",
  // Translúcido sobre branco some: fundo sólido e contorno visível
  iconButtonBg: "#F1F1F3",
  iconButtonBorder: "#D4D4D8",

  tabBackgroud: "#FFFFFF",
  text: "#18181B",
};

export const THEME_COLORS: Record<AppTheme, ThemeColors> = {
  dark: darkColors,
  light: lightColors,
};
