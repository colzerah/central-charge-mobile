export interface InputOptProps {
  error?: boolean;
  onChange?: ((code: string) => void) | undefined;
  onFinishedChange?: ((code: string) => void) | undefined;
  errorMessage?: string;
}
