export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export interface ScreenHeaderBackButtonProps {
  onBack?: () => void;
}
