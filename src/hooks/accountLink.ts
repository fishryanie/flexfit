import appleAuth from '@invertase/react-native-apple-authentication';
import {appleSignIn, googleSignIn} from 'services/auth';
import {Platform} from 'react-native';
import {useEffect} from 'react';

export default function useAccountLink() {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked');
      });
    }
  }, []);

  return {appleSignIn, googleSignIn};
}
