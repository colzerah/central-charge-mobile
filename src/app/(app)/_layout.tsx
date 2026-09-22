import { Stack, router } from "expo-router";
import { useEffect } from "react";

import Header from "@/src/components/Header";
import { C } from "@/src/theme";

// Este grupo só é montado quando autenticado: o Stack.Protected em
// src/app/_layout.tsx já garante isso, então não precisa checar de novo aqui.
export default function AppLayout() {
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
              title="Veículos"
              subtitle="Gerencie seus carros cadastrados"
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
              title="Novo veículo"
              subtitle="Adicione um carro à sua conta"
            />
          ),
        }}
      />
    </Stack>
  );
}
