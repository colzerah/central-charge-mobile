export interface SeekProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  w?: number;
}
