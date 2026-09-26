import type { AxiosError } from "axios";
import axios from "axios";
import type { ApiError } from "../types";
import { getToken } from "../utils/auth";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const VITE_BASE_VERSION = process.env.EXPO_PUBLIC_BASE_VERSION;

const BASE_CONFIG = {
  baseURL: BASE_URL + "/" + VITE_BASE_VERSION,
  headers: {
    "Content-Type": "application/json"
  }
};

const handleError = (error: AxiosError<ApiError>) => {
  return Promise.reject(error.response);
};

export const httpClient = axios.create(BASE_CONFIG);

httpClient.interceptors.request.use(
  (config) => {
    try {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Failed to get access token", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use((res) => res.data, handleError);
