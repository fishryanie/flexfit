import {AxiosError} from 'axios';
import {ToastData, ToastOptions} from 'react-native-toast-message';

export type Size = number | PercentString;
export type PercentString = `${number}%`;
export type AllOrNone<T> = T | {[K in keyof T]?: never};
export type AnyObject = {[key: string]: any};
export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;
export type ToastProps = ToastData &
  Omit<ToastOptions, 'type' | 'props' | 'onPress' | 'onHide' | 'onShow'> & {
    type: 'error' | 'success' | 'warning';
    action?: {title: string; onPress: () => void};
  };

export type ApiResponse = {
  statusCode: number;
  message: string;
};

export type ApiResponseData<D> = ApiResponse & {
  data: D;
};

export type AppAxiosError = AxiosError<ApiResponse>;

type Paging = {
  p?: number;
  limit?: number;
};

export type PagingParams<P = void> = P extends void ? Paging | void : Paging & P;

export type PagingResponseData<D> = ApiResponse & {
  total_pages: number;
  total: number;
  per_page: number;
  current_page: number;
  data: D[];
};
