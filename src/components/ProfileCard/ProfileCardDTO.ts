export interface ProfileCardProps {
  name: string;
  imageURI?: string;
  email?: string;
  premium?: boolean;
  // Texto da tag de premium (vem traduzido de quem usa o card)
  premiumLabel?: string;
}
