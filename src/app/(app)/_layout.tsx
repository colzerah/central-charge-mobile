import { useAppSelector } from "@/src/redux/store";
import { Redirect, Stack } from "expo-router";

import Header from "@/src/components/Header";

export default function AppLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.authState);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
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
