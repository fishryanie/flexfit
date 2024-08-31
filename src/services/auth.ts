import auth from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '807948756966-7lb7p3duvcd6l2ukejrt20om0qtmhnin.apps.googleusercontent.com',
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.signOut();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('🚀 ~ googleSignIn ~ error:', error);
  }
};

export const appleSignIn = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      return await auth().signInWithCredential(appleCredential);
    }
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
  } catch (error) {
    console.error('🚀 ~ appleSignIn ~ error:', error);
  }
};
