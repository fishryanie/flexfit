// import React, {Fragment, useEffect, useState} from 'react';
// import auth from '@react-native-firebase/auth';
// import appleAuth from '@invertase/react-native-apple-authentication';
// import {Block, Icon, Image, Loading, Pressable} from 'components/base';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {useDeviceName} from 'react-native-device-info';
// import {useAppSelector} from 'hooks/redux';
// import {Platform} from 'react-native';
// import {COLORS} from 'themes/color';
// import {ICONS} from 'assets';

// GoogleSignin.configure({
//   offlineAccess: true,
//   webClientId: '1035425635532-sv5b86d2uhlp7f6bbqg3ogs44in49lqi.apps.googleusercontent.com',
// });

// export const SocialConnect = () => {
//   const [isLoadingSocial, setLoadingSocial] = useState(false);
//   const {result: deviceName} = useDeviceName();
//   const deviceToken = useAppSelector(state => state.other.deviceToken);

//   const googleLogin = async () => {
//     await GoogleSignin.signOut();
//     const {idToken} = await GoogleSignin.signIn();
//     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//     return auth().signInWithCredential(googleCredential);
//   };

//   const appleLogin = async () => {
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: appleAuth.Operation.LOGIN,
//       requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
//     });
//     const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
//     if (credentialState === appleAuth.State.AUTHORIZED) {
//       const {identityToken, nonce} = appleAuthRequestResponse;
//       const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
//       return await auth().signInWithCredential(appleCredential);
//     }
//     if (!appleAuthRequestResponse.identityToken) {
//       throw new Error('Apple Sign-In failed - no identify token returned');
//     }
//   };

//   const handleLoginSocial = async (type: 'google' | 'facebook' | 'apple') => {
//     setLoadingSocial(true);
//     let profile;
//     try {
//       switch (type) {
//         case 'apple':
//           profile = await appleLogin();
//           break;
//         case 'google':
//           profile = await googleLogin();
//           break;
//         default:
//           break;
//       }
//       if (profile) {
//         const data = {
//           type: type,
//           social_id: profile?.user.providerData[0].uid,
//           device_name: deviceName,
//           device_token: deviceToken!,
//           info: {
//             id: profile?.user.providerData[0].uid,
//             email: profile.user.email,
//             photo: profile.user.photoURL,
//             phone: profile.user.phoneNumber,
//             name: profile.user.displayName,
//           },
//         };
//       }
//       console.log("🚀 ~ handleLoginSocial ~ data:", data)
//     } catch (error) {
//       console.log('===error', error);
//     } finally {
//       setLoadingSocial(false);
//     }
//   };

//   useEffect(() => {
//     if (Platform.OS === 'ios') {
//       return appleAuth.onCredentialRevoked(async () => {
//         console.warn('If this function executes, User Credentials have been Revoked');
//       });
//     }
//   }, []);

//   return (
//     <Fragment>
//       <Loading visible={isLoadingSocial} />
//       <Block rowCenter alignSelf="center" marginBottom={20}>
//         {Platform.OS === 'ios' && (
//           <Pressable
//             round={45}
//             contentCenter
//             backgroundColor={COLORS.black}
//             marginRight={20}
//             onPress={() => handleLoginSocial('apple')}>
//             <Icon type="AntDesign" name="apple1" size={25} color={COLORS.white} />
//           </Pressable>
//         )}
//         {/* <Pressable marginRight={20}>
//           <Image square={47} source={ICONS.ic_facebook} />
//         </Pressable> */}
//         <Pressable round={47} onPress={() => handleLoginSocial('google')}>
//           <Image round={47} source={ICONS.ic_google} />
//         </Pressable>
//       </Block>
//     </Fragment>
//   );
// };
