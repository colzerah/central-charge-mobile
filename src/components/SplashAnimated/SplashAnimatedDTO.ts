export interface SplashAnimatedProps {
  // true quando fontes, sessão e flag do tour já foram lidas
  isReady: boolean;
  // true quando as fontes carregaram: o texto circular e as frases
  // usam Inter, então a sequência só começa depois disso
  fontsReady: boolean;
  // chamado depois do fade-out, para desmontar a splash
  onFinish: () => void;
}
