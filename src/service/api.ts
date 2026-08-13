import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.adviceslip.com",
  // timeout: 15000,
});

api.interceptors.request.use((config) => {
  // adicionar token
  return config;
});
