import BackgroundGradient from "@/src/components/BackgroundGradient";
import Onboarding from "@/src/components/Onboarding";
import { OnboardingSlide } from "@/src/components/Onboarding/OnboardingDTO";
import { useOnboarding } from "@/src/hooks/useOnboarding";

import { useTranslation } from "@/src/hooks/useTranslation";
import { TFunction } from "@/src/i18n";
const getSlides = (t: TFunction): OnboardingSlide[] => [
  {
    id: "map",
    image: require("src/assets/onBoarding/Tour1.png"),
    icon: "MapPin",
    title: t("onboarding.mapTitle") /* pt: "Encontre pontos de recarga" */,
    description: t("onboarding.mapDescription") /* pt: "Veja no mapa os carregadores perto de você e trace a rota até eles." */,
  },
  {
    id: "scan",
    image: require("src/assets/onBoarding/Tour2.jpg"),
    icon: "QrCode",
    title: t("onboarding.scanTitle") /* pt: "Recarregue pelo app" */,
    description: t("onboarding.scanDescription") /* pt: "Escaneie o QR Code do carregador para iniciar a recarga em segundos." */,
  },
  {
    id: "vehicles",
    image: require("src/assets/onBoarding/Tour3.jpg"),
    icon: "Car",
    title: t("onboarding.vehiclesTitle") /* pt: "Cadastre seus veículos" */,
    description: t("onboarding.vehiclesDescription") /* pt: "Guarde os dados do seu carro para agilizar cada recarga." */,
  },
  {
    id: "history",
    image: require("src/assets/onBoarding/Tour4.jpg"),
    icon: "ChartLine",
    title: t("onboarding.historyTitle") /* pt: "Acompanhe seu histórico" */,
    description: t("onboarding.historyDescription") /* pt: "Consulte recargas anteriores, consumo e valores quando quiser." */,
  },
];

// Ao concluir, o guard do _layout tira esta rota da pilha e leva para o
// (auth), que redireciona para /login. Por isso não tem router.replace.
export default function OnboardingScreen() {
  const { completeOnboarding } = useOnboarding();
  const { t } = useTranslation();

  return (
    <BackgroundGradient>
      <Onboarding slides={getSlides(t)} onFinish={completeOnboarding} />
    </BackgroundGradient>
  );
}
