import axios from "axios";

export function getAuthErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401) {
      return {
        title: "Credenciais inválidas",
        subTitle: "Verifique seu email e senha.",
      };
    }

    if (status === 500 || status === 502 || status === 503) {
      return {
        title: "Serviço indisponível",
        subTitle: "Tente novamente em alguns instantes.",
      };
    }

    if (!error.response) {
      return {
        title: "Sem conexão",
        subTitle: "Verifique sua conexão com a internet.",
      };
    }
  }

  return {
    title: "Erro inesperado",
    subTitle: "Não foi possível realizar o login. Tente novamente.",
  };
}
