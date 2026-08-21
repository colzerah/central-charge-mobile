import { useAppSelector } from "@/src/redux/store";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export function useAuth() {
  const router = useRouter();
  const { isAuthenticated, isAuthLoading } = useAppSelector(
    (state) => state.authState,
  );
  const [autenticado, setAutenticado] = useState(isAuthenticated);

  useEffect(() => {
    if (isAuthLoading) return;

    if (isAuthenticated) {
      setAutenticado(true);
      router.replace("/home");
    } else {
      setAutenticado(false);
      router.replace("/login");
    }
  }, [isAuthenticated, isAuthLoading]);
  return { isAuthLoading, isAuthenticated: autenticado };
}
