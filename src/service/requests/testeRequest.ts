import { api } from "../api";

export const requestTeste = async (): Promise<any[]> => {
  const response = await api.get("/advice");
  return response.data;
};
