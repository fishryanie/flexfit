import axios from 'axios';

export const BASE_URL = 'https://hacker-news.firebaseio.com/v0/';

const instance = axios.create({baseURL: BASE_URL, timeout: 30000});

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    throw error;
  },
);

const api = {
  get: async <T = void>(
    url: string & (T extends void ? 'Bạn chưa khai báo kiểu trả về' : string),
    params?: any,
  ): Promise<T> => {
    const response = await instance.get<T>(url, {params});
    return response.data;
  },
};

export default api;
