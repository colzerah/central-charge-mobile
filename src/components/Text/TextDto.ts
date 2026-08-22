import { Text as RNText } from "@/src/components/ui/text";

export interface ITextProps extends React.ComponentProps<typeof RNText> {
  color?: string;
  title?: string;
  fontFamily?: "Inter-Regular" | "Inter-SemiBold" | "Inter-Bold";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}
