import { C } from "@/src/theme";
import SeekBar from "../shared/ui/molecules/seek-bar/SeekBar";
import { SeekProps } from "./SeekDTO";

const Seek = ({ value, onChange, min = 1, max = 300, w = 100 }: SeekProps) => {
  const range = max - min;
  const toNormalized = (v: number) => (v - min) / range;
  const fromNormalized = (n: number) => Math.round(min + n * range);

  return (
    <SeekBar
      value={toNormalized(value)}
      onValueChange={(n) => onChange(fromNormalized(n))}
      thumbColor={C.white}
      thumbSize={20}
      showThumb={true}
      trackScale={1}
      activeHeight={0}
      activeColor={C.brand300}
      inactiveColor={C.ink200}
      width={w}
    />
  );
};

export default Seek;
