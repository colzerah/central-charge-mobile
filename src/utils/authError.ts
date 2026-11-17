import axios from "axios";
import { translate } from "../i18n";

export function getAuthErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401) {
      return {
        title: translate("auth.errors.invalidCredentialsTitle") /* pt: "Credenciais inválidas" */,
        subTitle: translate("auth.errors.invalidCredentialsMessage") /* pt: "Verifique seu email e senha." */,
      };
    }

    if (status === 500 || status === 502 || status === 503) {
      return {
        title: translate("auth.errors.unavailableTitle") /* pt: "Serviço indisponível" */,
        subTitle: translate("auth.errors.unavailableMessage") /* pt: "Tente novamente em alguns instantes." */,
      };
    }

    if (!error.response) {
      return {
        title: translate("auth.errors.offlineTitle") /* pt: "Sem conexão" */,
        subTitle: translate("auth.errors.offlineMessage") /* pt: "Verifique sua conexão com a internet." */,
      };
    }
  }

  return {
    title: translate("auth.errors.unexpectedTitle") /* pt: "Erro inesperado" */,
    subTitle: translate("auth.errors.unexpectedMessage") /* pt: "Não foi possível realizar o login. Tente novamente." */,
  };
}
