import { AnimatedMeshGradient } from "../shared/ui/organisms/mesh-gradient";
import { IMeshGradientColor } from "../shared/ui/organisms/mesh-gradient/types";

const BackgroundGradient = ({ children }: { children: React.ReactNode }) => {
  const colors: IMeshGradientColor[] = [
    { r: 10 / 255, g: 10 / 255, b: 11 / 255 }, // ink0   #0A0A0B
    { r: 24 / 255, g: 24 / 255, b: 27 / 255 }, // ink50  #18181B
    { r: 39 / 255, g: 39 / 255, b: 42 / 255 }, // ink100 #27272A
    { r: 63 / 255, g: 63 / 255, b: 70 / 255 }, // ink200 #3F3F46
  ];

  return (
    <AnimatedMeshGradient
      speed={2}
      contrast={0.2}
      noise={0.3}
      blur={2}
      animated={true}
      colors={colors}
    >
      {children}
    </AnimatedMeshGradient>
  );
};

export default BackgroundGradient;
