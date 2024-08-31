import store from 'stores';
import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {Token} from 'types/auth';
import {ApiResponseData} from 'types/shared';
import {expiredToken} from 'stores/auth/slice';

export const DEV_URL = 'http://192.168.2.6:8000';
export const RELEASE_URL = 'https://fitate.onrender.com';
export const BASE_URL = DEV_URL;

const instance = axios.create({baseURL: BASE_URL, timeout: 30000});

export const httpRequest = async <T>(configs: AxiosRequestConfig): Promise<T> => {
  const response = await instance<T>(configs);
  return response.data;
};

instance.interceptors.request.use(
  async config => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.setAuthorization(`Bearer ${accessToken}`);
    }
    return config;
  },
  error => {
    throw error;
  },
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = store.getState().auth.refreshToken;
        const result: ApiResponseData<Token> = await axios.post(`${BASE_URL}/auth/refresh-token`, {refreshToken});
        instance.defaults.headers.common.Authorization = `Bearer ${result.data.accessToken}`;
        return instance(originalRequest);
      } catch (err) {
        const refreshTokenError = err as AxiosError;
        if (refreshTokenError.response?.status === 401) {
          return store.dispatch(expiredToken(true));
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);
