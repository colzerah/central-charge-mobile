import { useAppSelector } from "@/src/redux/store";
import { useCallback, useEffect } from "react";

interface SignInParams {
  user: string;
  password: string;
}

export function useAuth() {
  const { isAuthenticated, isAuthLoading } = useAppSelector(
    (state) => state.authState,
  );

  const signIn = useCallback(({ user, password }: SignInParams) => {
    console.log("signIn", user, password);
  }, []);

  const signOut = useCallback(() => {}, []);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated, isAuthLoading]);

  return { isAuthLoading, isAuthenticated, signIn, signOut };
}
