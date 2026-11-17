export interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  maxLength?: number;
}
