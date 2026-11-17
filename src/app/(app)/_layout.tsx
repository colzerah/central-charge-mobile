import { Stack, router } from "expo-router";
import { useEffect } from "react";

import Header from "@/src/components/Header";
import { useTranslation } from "@/src/hooks/useTranslation";
import { C } from "@/src/theme";

// Este grupo só é montado quando autenticado: o Stack.Protected em
// src/app/_layout.tsx já garante isso, então não precisa checar de novo aqui.
export default function AppLayout() {
  // Os headers abaixo são traduzidos e precisam atualizar ao trocar o idioma
  const { t } = useTranslation();

  // No Android, apertar voltar na raiz do app manda a Activity pra segundo
  // plano em vez de encerrá-la (ver MainActivity.invokeDefaultOnBackPressed,
  // boilerplate padrão do Expo) — a pilha nativa de telas do
  // react-native-screens continua viva. Se o bundle JS recarrega enquanto
  // isso acontece (comum durante desenvolvimento com o Metro), esse layout
  // remonta do zero, mas a tela nativa que ficou visível por último (ex.:
  // veiculos) pode não bater com o estado novo do React Navigation, deixando
  // o usuário preso ali sem histórico pra voltar. Forçar a rota inicial
  // conhecida sempre que este grupo monta evita depender do que a camada
  // nativa "lembra" sozinha.
  useEffect(() => {
    router.replace("/home");
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.ink0 },
      }}
    >
      <Stack.Screen
        name="veiculos"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("vehicles.title") /* pt: "Veículos" */}
              subtitle={t("vehicles.subtitle") /* pt: "Gerencie seus carros cadastrados" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="novo-veiculo"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("newVehicle.headerTitle") /* pt: "Novo veículo" */}
              subtitle={t("newVehicle.headerSubtitle") /* pt: "Adicione um carro à sua conta" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="scan-detalhes"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("scan.headerTitle") /* pt: "Escanear QR Code" */}
              subtitle={t("scan.headerSubtitle") /* pt: "Escaneie para iniciar o carregamento" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="scan-code"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("scanCode.headerTitle") /* pt: "Código manual" */}
              subtitle={t("scanCode.headerSubtitle") /* pt: "Inserir manualmente" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="pin-detalhes"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("stationDetails.title") /* pt: "Detalhes da estação" */}
              // subtitle="Adicione um carro à sua conta"
            />
          ),
        }}
      />
      <Stack.Screen
        name="configuracoes"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("settings.title") /* pt: "Configurações" */}
              subtitle={t("settings.subtitle") /* pt: "Ajuste as preferências do App." */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="reportar-estacao"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("report.station.headerTitle") /* pt: "Relatar problema" */}
              subtitle={t("report.station.headerSubtitle") /* pt: "Avise sobre falhas nesta estação" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="reportar-problema"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("report.app.headerTitle") /* pt: "Reportar problema" */}
              subtitle={t("report.app.headerSubtitle") /* pt: "Erros ou falhas no app" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="idioma"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("language.title") /* pt: "Idioma" */}
              subtitle={t("language.subtitle") /* pt: "Idioma do aplicativo" */}
            />
          ),
        }}
      />
      <Stack.Screen
        name="sobre"
        options={{
          headerShown: true,
          header: () => (
            <Header
              title={t("about.title") /* pt: "Sobre o app" */}
              subtitle={t("about.subtitle") /* pt: "Informações do aplicativo" */}
            />
          ),
        }}
      />
    </Stack>
  );
}
