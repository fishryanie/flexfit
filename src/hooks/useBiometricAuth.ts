import {useState, useEffect} from 'react';
import ReactNativeBiometrics, {BiometryType} from 'react-native-biometrics';

export const useBiometricAuth = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [biometricType, setBiometricType] = useState<BiometryType>();
  useEffect(() => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics.isSensorAvailable().then(resultObject => {
      const {available, biometryType} = resultObject;
      setBiometricType(biometryType);
      setIsBiometricSupported(available);
    });
  }, []);

  const authenticate = async () => {
    if (!isBiometricSupported) {
      return false;
    }
    const rnBiometrics = new ReactNativeBiometrics();
    const {success} = await rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint', cancelButtonText: 'Huỷ'});
    if (success) {
      setIsAuthenticated(true);
      return true;
    } else {
      setIsAuthenticated(false);
      return false;
    }
  };

  return {
    isBiometricSupported,
    isAuthenticated,
    biometricType,
    authenticate,
  };
};
