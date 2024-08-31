import Toast from 'react-native-toast-message';
import CryptoJS from 'crypto-js';
import {Linking} from 'react-native';
import {getVersion} from 'react-native-device-info';
import {BUILD_VERSION} from './constants';
import { ToastProps } from 'types/shared';

export const DEFAULT_LOCALES = 'vi-VN';
export const NUMBER_FORMAT = new Intl.NumberFormat(DEFAULT_LOCALES);

/**
 * @param time miliseconds
 * @default 3000
 */
export const sleep = (time = 3000) => new Promise(r => setTimeout(r, time));

export const getInitialsName = (name: string): string => {
  const words = name.split(' ');
  let result = '';
  for (const word of words) {
    result += word.charAt(0).toUpperCase();
  }
  if (!result) {
    console.warn('Could not get abbr from name');
    result = name;
  }
  return result;
};

export const decodeHtml = (html: string): string => {
  if (!html) {
    return '';
  }
  const entities: {[key: string]: string} = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&nbsp;': ' ',
    '&hellip;': '…',
  };
  return html.replace(/&[^\s;]+;/g, entity => {
    return entities[entity] || entity;
  });
};

export const showToast = (toastProps: ToastProps) => {
  return Toast.show({...toastProps, type: 'ToastMessage', props: {status: toastProps.type, action: toastProps.action}});
};

export const handleOpenLink = async (link?: string) => {
  if (!link) {
    return showToast({type: 'error', text1: 'Không tìm thấy link', text2: link});
  }
  try {
    const supported = await Linking.openURL(link);
    if (!supported) {
      showToast({type: 'error', text1: 'Không thể mở liên kết', text2: link});
    }
  } catch (error) {
    console.log('🚀 ~ handleOpenLink ~ error:', error);
  }
};

export const getDeviceIp = async () => {
  try {
    const {ip} = await (await fetch('https://api.ipify.org/?format=json')).json();
    return ip as string;
  } catch (error) {
    return undefined;
  }
};

export const isNewerVersion = (oldVersion = '', newVersion = '') => {
  const oldParts = oldVersion.split('.');
  const newParts = newVersion.split('.');
  for (let i = 0; i < newParts?.length; i++) {
    const a = +newParts[i] || 0;
    const b = +oldParts[i] || 0;
    if (a > b) {
      return true;
    }
    if (a < b) {
      return false;
    }
  }
  return false;
};

export const displayVersion = () => {
  return `v.${getVersion()}.${BUILD_VERSION}`;
};

export const hashPwd = (password: string): string => {
  return CryptoJS.SHA256(password).toString();
};
