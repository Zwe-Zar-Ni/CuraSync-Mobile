import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { ApiError } from '../types';
import {
  getRefreshToken,
  getToken,
  removeRefreshToken,
  removeToken,
  setRefreshToken,
  setToken,
} from '../utils/auth';
import { router } from 'expo-router';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const BASE_VERSION = process.env.EXPO_PUBLIC_BASE_VERSION;

const BASE_CONFIG = {
  baseURL: BASE_URL + '/' + BASE_VERSION,
  headers: {
    'Content-Type': 'application/json',
  },
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
};

let refreshPromise: Promise<string> | null = null;
let isRedirectingToLogin = false;

const redirectToLogin = async () => {
  await removeToken();
  await removeRefreshToken();
  if (isRedirectingToLogin) return;
  isRedirectingToLogin = true;
  router.push('/auth/login');
};

const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) return refreshPromise;

  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    redirectToLogin();
    return Promise.reject(new Error('No refresh token available'));
  }

  const refreshUrl = `${BASE_URL}/${BASE_VERSION}/auth/refresh`;

  refreshPromise = axios
    .post<RefreshResponse>(refreshUrl, {
      refresh_token: refreshToken,
    })
    .then(async ({ data }) => {
      await setToken(data.data.access_token);
      await setRefreshToken(data.data.refresh_token);
      return data.data.access_token;
    })
    .catch((error) => {
      redirectToLogin();
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

// eslint-disable-next-line import/no-named-as-default-member
export const httpClient = axios.create(BASE_CONFIG);

httpClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Failed to get access token', error);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const response = error.response as ApiError | undefined;
    const isUnauthorized = response?.status === 401;
    const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh');

    if (isUnauthorized && originalRequest && !isRefreshRequest) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const accessToken = await refreshAccessToken();
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return httpClient(originalRequest);
        } catch {
          return Promise.reject(response ?? error);
        }
      }

      redirectToLogin();
      return Promise.reject(response ?? error);
    }

    if (!isUnauthorized) {
      console.error(response?.data ?? 'Something went wrong');
    }
    return Promise.reject(response ?? error);
  },
);
