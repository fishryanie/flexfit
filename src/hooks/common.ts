import messaging from '@react-native-firebase/messaging';
import {DependencyList, EffectCallback, useEffect, useRef, useState} from 'react';
import {isEqual} from 'lodash';

const useDeepCompareMemoize = <T>(value: T): T => {
  const ref = useRef<T>(value);
  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
};

export const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};

export const useFCMToken = () => {
  const [deviceToken, setDeviceToken] = useState<string | undefined>();
  useEffect(() => {
    messaging()
      .getToken()
      .then(token => {
        setDeviceToken(token);
        if (__DEV__) {
          console.log('DEVICE_TOKEN', token);
        }
      });
    const unSubscribe = messaging().onTokenRefresh(setDeviceToken);
    return () => {
      unSubscribe();
    };
  }, []);
  return deviceToken;
};
