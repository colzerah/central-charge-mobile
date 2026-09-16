import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://api-carregamento.ddns.net:8082/api/v1",
  headers: {
    Pragma: "no-cache",
    "Content-Type": "application/json",
  },
  // timeout: 30000,
});

api.interceptors.request.use(async (config) => {
  // adicionar token
  // const { token } = useAppSelector((state) => state.authState);
  const token = await AsyncStorage.getItem("@token");
  console.log("token", token);

  if (token) config.headers.Authorization = `Bearer ${token}`;

  console.log("interceptor", config);
  return config;
});

api.interceptors.response.use((config) => {
  console.log("interceptorRES", config);
  return config;
});
