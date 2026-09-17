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
  const { isAuthLoading } = useAppSelector((state) => state.authState);

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
      dispatch(addIsAuthenticated(true));

      router.replace("/home");
    } catch (err) {
      console.log("Erro Login", err);
      //chamaria o toast de erro
    } finally {
      dispatch(addloading(false));
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(["@isAuthenticated", "@token"]);
    dispatch(addlogout());
    router.replace("/login");
  }, []);

  return { isAuthLoading, signIn, signOut };
}

// Roda uma única vez na inicialização do app, antes da splash screen
// sumir, para restaurar a sessão persistida e decidir se o usuário
// entra em (app) ou (auth). Ver src/app/_layout.tsx.
// isAuthenticated fica null até essa leitura terminar — não dá pra
// usar só true/false aqui, senão não teríamos como distinguir
// "ainda não sei" de "sei que não está logado".
export function useAuthBootstrap() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.authState);

  useEffect(() => {
    (async () => {
      const storedIsAuthenticated =
        await AsyncStorage.getItem("@isAuthenticated");
      dispatch(
        storedIsAuthenticated === "true"
          ? addIsAuthenticated(true)
          : addIsAuthenticated(false),
      );
    })();
  }, []);

  return { isAuthenticated };
}
