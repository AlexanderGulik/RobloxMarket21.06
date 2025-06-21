import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { UrlEnums } from '../const/URLs/urls';
import { UserStoreI } from '../types/common';
import { putItemInLocalStorage } from '../utils/LocalStorage';

const userDefault = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
};

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  url?: string;
}

const httpClient: AxiosInstance = axios.create({
  baseURL: UrlEnums.HOST,
  withCredentials: true,
});

const getAccessToken = (): string | null => {
  const store = localStorage.getItem('store');
  if (store) {
    const userStore: UserStoreI = JSON.parse(store);
    return userStore.accessToken;
  }
  return null;
};

const updateTokens = (newAccessToken: string) => {
  const store = localStorage.getItem('store');
  if (store) {
    const userStore: UserStoreI = JSON.parse(store);
    userStore.accessToken = newAccessToken;
    localStorage.setItem('store', JSON.stringify(userStore));
  }
};

let isRefreshing = false;

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/api/auth/refresh-token')
    ) {

      if (isRefreshing) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios({
          method: 'post',
          url: `${UrlEnums.HOST}/auth/refresh-token`,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });


        const newAccessToken = response.data.accessToken;
        updateTokens(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        isRefreshing = false;

        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Ошибка при обновлении токена:', refreshError);
        isRefreshing = false;
        putItemInLocalStorage('store', userDefault);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
