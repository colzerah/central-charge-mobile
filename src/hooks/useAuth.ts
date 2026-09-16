import { useAppDispatch, useAppSelector } from "@/src/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  addIsAuthenticated,
  addloading,
  addlogout,
  addUser,
} from "../redux/authSlice";
import { requestLogin, requestLoginMe } from "../service/requests/authRequests";
interface SignInParams {
  login: string;
  password: string;
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const { isAuthLoading, isAuthenticated } = useAppSelector(
    (state) => state.authState,
  );

  const signIn = useCallback(async ({ login, password }: SignInParams) => {
    try {
      dispatch(addloading(true));
      const response = await requestLogin({
        email: login,
        password: password,
      });

      if (!response.success) {
        //mensagem que vai ser enviada para a mensagem de erro no catch para ser usado no toast
        throw new Error("Login feito sem success");
      }

      await AsyncStorage.setItem("@token", response.data.token);
      const responseMe = await requestLoginMe();
      const { id, name, email, created_at } = responseMe.data;

      dispatch(
        addUser({
          id,
          name,
          // cpf: string;
          email,
          createdAt: created_at,
        }),
      );

      await AsyncStorage.setItem("@isAuthenticated", "true");
      dispatch(addIsAuthenticated());

      router.replace("/home");
    } catch (err) {
      console.log("Erro Login", err);
      //chamaria o toast de erro
    } finally {
      dispatch(addloading(false));
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.setItem("@isAuthenticated", "false");
    dispatch(addlogout());
    router.replace("/login");
  }, []);

  useEffect(() => {
    (async () => {
      const isAuthenticated = await AsyncStorage.getItem("@isAuthenticated");
      if (isAuthenticated === "true") {
        dispatch(addIsAuthenticated());
        router.replace("/home");
      }
    })();
  }, [isAuthenticated]);

  return { isAuthLoading, signIn, signOut };
}
