import { Text as RNText } from "@/components/ui/text";
import { ITextProps } from "./textDto";

const Text = ({
  color = "black",
  title = "Lorem ipsum.",
  fontFamily = "Inter-Regular",
  size = "md",
}: ITextProps) => {
  return (
    <RNText size={size} style={{ color: color, fontFamily: fontFamily }}>
      {title}
    </RNText>
  );
};

export { Text };
