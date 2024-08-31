import {Platform} from 'react-native';

export const BUILD_VERSION = '1430.2307';

export const IS_IOS = Platform.OS === 'ios';

export const PHONE_REGEX = /^(84|0)(3|5|7|8|9)([0-9]{8})$/;

export const EMAIL_REGEX =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

/**
 * - Sử dụng SKIP_TOKEN để ngừng hook request api mà ko cần truyền undefined,false
 * @example
 * ```
 * ❌useGetData(undefined,false)
 * ✅useGetData(SKIP_TOKEN)
 * ```
 */
export const SKIP_TOKEN = 'SKIP_TOKEN' as any;

export const APP_INFO = {
  androidBundleId: 'com.ims.sky',
  iosBundleId: 'com.imsvietnamese.sky',
  iosAppStoreId: '6475276823',
} as const;

export const INSTALL_APP_URL = Platform.select({
  android: `https://play.google.com/store/apps/details?id=${APP_INFO.androidBundleId}`,
  ios: `itms-apps://itunes.apple.com/app/${APP_INFO.iosAppStoreId}`,
}) as string;

export const STORE = Platform.select({
  ios: {
    ionIconName: 'logo-apple-appstore',
    name: 'Appstore',
  },
  android: {
    ionIconName: 'logo-google-playstore',
    name: 'CH Play',
  },
}) as {ionIconName: string; name: string};

export const CODE_PUSH_DEPLOYMENT_KEY = Platform.select({
  ios: {
    Staging: 'cDCWXNty070zPJzWO2S5VgpRzJscaejllXYiH',
    Alpha: 'jYa0PGBj7ETpKxIckFL_3WhMEB1V0ZG_Bvrto',
    Beta: 'FWn6_jjb5W34jWIwppf6bN5n2qkwhXzqGRqG5',
    Production: 'MzjyIg0ITDx016E1-ciK3Qa_kgzcew-IF06Qo',
  },
  android: {},
}) as {Staging: string; Alpha: string; Beta: string; Production: string};
