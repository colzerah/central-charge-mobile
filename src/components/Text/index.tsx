import { Text as GlueText } from "@/components/ui/text";
import { ITextProps } from "./textDto";

const Text = ({
  color = "black",
  title = "Lorem ipsum.",
  fontFamily = "Inter-Regular",
  size = "md",
}: ITextProps) => {
  return (
    <GlueText size={size} style={{ color: color, fontFamily: fontFamily }}>
      {title}
    </GlueText>
  );
};

export { Text };
