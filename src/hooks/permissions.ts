import {useCallback, useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  Permission,
  check as _check,
  request as _request,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

const createPermissionHook =
  (permission: Permission) =>
  ({request = true, check = true} = {}): [boolean | undefined, () => void] => {
    const [permited, setPermited] = useState<boolean>();
    const [requestAble, setRequestAble] = useState<boolean>();
    const pending = useRef(false);

    const requestPermission = useCallback(() => {
      if (!pending.current) {
        pending.current = true;
        _request(permission)
          .then(result => {
            switch (result) {
              case 'granted':
                setPermited(true);
                break;
              default: // 'unavailable' | 'blocked' | 'limited' | 'denied'
                setPermited(false);
                break;
            }
          })
          .catch(() => {
            setPermited(false);
          })
          .finally(() => {
            pending.current = false;
            setRequestAble(false);
          });
      }
    }, []);

    useEffect(() => {
      if (check) {
        _check(permission)
          .then(result => {
            switch (result) {
              case 'denied':
                setRequestAble(true);
                setPermited(p => (p ? false : p));
                break;
              case 'granted':
                setPermited(true);
                break;
              default: // 'unavailable' | 'blocked' | 'limited'
                setRequestAble(false);
                setPermited(false);
                break;
            }
          })
          .catch(() => {
            setRequestAble(false);
            setPermited(false);
          });
      }
    }, [check]);

    useEffect(() => {
      if (request && requestAble) {
        requestPermission();
      }
    }, [request, requestAble, requestPermission]);

    return [permited, requestPermission];
  };

export const useCameraPermission = createPermissionHook(
  Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  }) as Permission,
);

export const useLocationPermission = createPermissionHook(
  Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  }) as Permission,
);

export const useMicrophonePermission = createPermissionHook(
  Platform.select({
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    ios: PERMISSIONS.IOS.MICROPHONE,
  }) as Permission,
);

export const usePhotoPermission = createPermissionHook(
  Platform.select({
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  }) as Permission,
);

export const useNotificationPermission = ({request = true, check = true} = {}): [boolean | undefined, () => void] => {
  const [permited, setPermited] = useState<boolean>();
  const [requestAble, setRequestAble] = useState<boolean>();
  const pending = useRef(false);

  const requestPermission = useCallback(() => {
    if (!pending.current) {
      pending.current = true;
      requestNotifications(['alert', 'badge', 'sound', 'criticalAlert'])
        .then(result => {
          switch (result.status) {
            case 'granted':
              setPermited(true);
              break;
            default: // 'unavailable' | 'blocked' | 'limited' | 'denied'
              setPermited(false);
              break;
          }
        })
        .catch(() => {
          setPermited(false);
        })
        .finally(() => {
          pending.current = false;
          setRequestAble(false);
        });
    }
  }, []);

  useEffect(() => {
    if (check) {
      checkNotifications()
        .then(result => {
          switch (result.status) {
            case 'denied':
              setRequestAble(true);
              setPermited(p => (p ? false : p));
              break;
            case 'granted':
              setPermited(true);
              break;
            default: // 'unavailable' | 'blocked' | 'limited'
              setRequestAble(false);
              setPermited(false);
              break;
          }
        })
        .catch(() => {
          setRequestAble(false);
          setPermited(false);
        });
    }
  }, [check]);

  useEffect(() => {
    if (request && requestAble) {
      requestPermission();
    }
  }, [request, requestAble, requestPermission]);

  return [permited, requestPermission];
};
