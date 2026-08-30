import { useAppSelector } from "@/src/redux/store";
import { Redirect, Stack } from "expo-router";
import { C } from "@/src/theme";

export default function AppLayout() {
  const { isAuthenticated } = useAppSelector((state) => state.authState);

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: C.ink0 },
      }}
    />
  );
}
