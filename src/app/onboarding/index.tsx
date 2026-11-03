import BackgroundGradient from "@/src/components/BackgroundGradient";
import Onboarding from "@/src/components/Onboarding";
import { OnboardingSlide } from "@/src/components/Onboarding/OnboardingDTO";
import { useOnboarding } from "@/src/hooks/useOnboarding";

const SLIDES: OnboardingSlide[] = [
  {
    id: "map",
    icon: "MapPin",
    title: "Encontre pontos de recarga",
    description:
      "Veja no mapa os carregadores perto de você e trace a rota até eles.",
  },
  {
    id: "scan",
    icon: "QrCode",
    title: "Recarregue pelo app",
    description:
      "Escaneie o QR Code do carregador para iniciar a recarga em segundos.",
  },
  {
    id: "vehicles",
    icon: "Car",
    title: "Cadastre seus veículos",
    description: "Guarde os dados do seu carro para agilizar cada recarga.",
  },
  {
    id: "history",
    icon: "ChartLine",
    title: "Acompanhe seu histórico",
    description:
      "Consulte recargas anteriores, consumo e valores quando quiser.",
  },
];

// Ao concluir, o guard do _layout tira esta rota da pilha e leva para o
// (auth), que redireciona para /login. Por isso não tem router.replace.
export default function OnboardingScreen() {
  const { completeOnboarding } = useOnboarding();

  return (
    <BackgroundGradient>
      <Onboarding slides={SLIDES} onFinish={completeOnboarding} />
    </BackgroundGradient>
  );
}
