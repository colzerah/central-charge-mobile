import { useAppSelector } from "@/src/redux/store";
import { useEffect } from "react";

export function useAuth() {
  const { isAuthenticated, isAuthLoading } = useAppSelector(
    (state) => state.authState,
  );

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated, isAuthLoading]);
  return { isAuthLoading, isAuthenticated };
}
