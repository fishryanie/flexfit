import {ToastData, ToastOptions} from 'react-native-toast-message';

export type PercentString = `${number}%`;
export type Size = number | PercentString;
export type AnyObject = {[key: string]: any};
export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;
export type ToastProps = ToastData &
  Omit<ToastOptions, 'type' | 'props' | 'onPress' | 'onHide' | 'onShow'> & {
    type: 'error' | 'success' | 'warning';
    action?: {title: string; onPress: () => void};
  };
