import axios from "axios";
import { localStorageKeys } from "../../config/localStorageKeys";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
  if (accessToken) {
    console.log(accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  async (response) => {
    // Simula um atraso de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return response;
  },
  async (error) => {
    // Também simula atraso em caso de erro (opcional)
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return Promise.reject(error);
  }
);
