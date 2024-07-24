// import React, {useEffect, useRef, useState} from 'react';
// import codePush, {DownloadProgress, LocalPackage, RemotePackage} from 'react-native-code-push';
// import RNShake from 'react-native-shake';
// import remoteConfig from '@react-native-firebase/remote-config';
// import {Block, Button, Icon, Pressable, Text} from 'components/base';
// import {useAppState} from '@react-native-community/hooks';
// import {Linking, Platform, Vibration} from 'react-native';
// import {getVersion} from 'react-native-device-info';
// import {increaseCountShake} from 'redux/other/slice';
// import {INSTALL_APP_URL} from 'utils/constants';
// import {isNewerVersion} from 'utils/helper';
// import {COLORS} from 'themes/color';
// import {CodePushProgressDialog} from '../CodePushProgressDialog';
// import {useAppDispatch, useAppSelector} from 'hooks/redux';

// const STORE = Platform.select({
//   ios: {
//     ionIconName: 'logo-apple-appstore',
//     name: 'Appstore',
//   },
//   android: {
//     ionIconName: 'logo-google-playstore',
//     name: 'CH Play',
//   },
// }) as {ionIconName: string; name: string};

// const CODE_PUSH_DEPLOYMENT_KEY = Platform.select({
//   ios: {
//     Alpha: 'fTltKlvHQESILNZ4Gspl0pKy5nWLcsETmP-dr',
//     Beta: '3bsOHD9oh2s5595EOgdjlTf6Q24GmCQg8Gy-K',
//     Production: 'T3Pf3oaZjG1E9tevgnlEJV7Ghhnz7ro-TuPjL',
//   },
//   android: {
//     Alpha: 's__lgsoRMtTGqwsNe6yo3hDKOeRFejkolef6C',
//     Beta: 'sF8Y-VIkHLozHuzMj_UyLklZDIHha2WvqDDh4',
//     Production: 'ZRCizi06gzETpKQpnalqI2bPYCL0ndMWd3Aon',
//   },
// }) as {Alpha: string; Beta: string; Production: string};

// const enum UpdateStatus {
//   LATEST,
//   HAVE_NEW_VERSION,
//   REQUIRE_UPDATE,
// }

// export const ModalUpdateApp = () => {
//   const [storeStatus, setStoreStatus] = useState<UpdateStatus>(UpdateStatus.LATEST);
//   const [codePushStatus, setCodePushStatus] = useState<UpdateStatus>(UpdateStatus.LATEST);
//   const [syncStatus, setSyncStatus] = useState(codePush.SyncStatus.UP_TO_DATE);
//   const [downloadProgress, setDownloadProgress] = useState<DownloadProgress>();
//   const [listUpdate, setListUpdate] = useState<{name: string; key: string; update: RemotePackage}[]>([]);
//   const [currentCodepush, setCurrentCodepush] = useState<LocalPackage | null>(null);
//   const dispatch = useAppDispatch();
//   const pendingRef = useRef(false);
//   const appState = useAppState();
//   const isImsIp = useIsImsIp();
//   const countShake = useAppSelector(state => state.other.countShake);

//   const openStore = () => {
//     Linking.openURL(INSTALL_APP_URL);
//   };

//   const updateCodepush = (deploymentKey: string, immediate: boolean) => {
//     setCodePushStatus(UpdateStatus.LATEST);
//     codePush.sync(
//       {
//         installMode: immediate ? codePush.InstallMode.IMMEDIATE : codePush.InstallMode.ON_NEXT_RESUME,
//         deploymentKey,
//         minimumBackgroundDuration: 10,
//         rollbackRetryOptions: {
//           delayInHours: 4,
//           maxRetryAttempts: 3,
//         },
//       },
//       s => {
//         if (immediate) {
//           setSyncStatus(s);
//         }
//       },
//       p => {
//         if (immediate) {
//           setDownloadProgress(p);
//         }
//       },
//     );
//   };

//   const hideModalCPTest = () => {
//     setListUpdate([]);
//     setCurrentCodepush(null);
//   };

//   const clearUpdate = () => {
//     codePush.clearUpdates();
//     codePush.restartApp();
//   };

//   useEffect(() => {
//     if (!__DEV__ && appState === 'active') {
//       const current_version_store = remoteConfig().getString('current_version_store');
//       if (current_version_store) {
//         const {android, ios} = JSON.parse(current_version_store);
//         const remoteVersion = Platform.select({android, ios});
//         const currentVersion = getVersion();
//         const haveNewVersion = isNewerVersion(currentVersion, remoteVersion.version);
//         if (haveNewVersion) {
//           if (remoteVersion.mandatory) {
//             setStoreStatus(UpdateStatus.REQUIRE_UPDATE);
//           } else {
//             setStoreStatus(UpdateStatus.HAVE_NEW_VERSION);
//           }
//         }
//       }
//     }
//   }, [appState]);

//   useEffect(() => {
//     const subscription = RNShake.addListener(() => {
//       dispatch(increaseCountShake());
//     });
//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   useEffect(() => {
//     if (countShake && isImsIp && !pendingRef.current && !listUpdate.length && !currentCodepush) {
//       (async () => {
//         try {
//           Vibration.vibrate(Platform.OS === 'android' ? 400 : [0]);
//           pendingRef.current = true;
//           const running = await codePush.getUpdateMetadata(codePush.UpdateState.RUNNING);
//           setCurrentCodepush(running);
//           const listDeployment = await Promise.all(
//             Object.entries(CODE_PUSH_DEPLOYMENT_KEY).map(async ([name, key]) => {
//               try {
//                 const update = await codePush.checkForUpdate(key);
//                 return {name, key, update};
//               } catch (error) {
//                 return {name, key, update: null};
//               }
//             }),
//           );
//           setListUpdate(
//             listDeployment.filter(x => x.update) as {
//               name: string;
//               key: string;
//               update: RemotePackage;
//             }[],
//           );
//         } catch (error) {
//         } finally {
//           pendingRef.current = false;
//         }
//       })();
//     }
//   }, [countShake, isImsIp]);

//   useEffect(() => {
//     if (!__DEV__ && appState === 'active' && codePushStatus !== UpdateStatus.REQUIRE_UPDATE && isImsIp === false) {
//       (async () => {
//         try {
//           const pending = await codePush.getUpdateMetadata(codePush.UpdateState.PENDING);
//           if (pending) {
//             return;
//           }
//           const update = await codePush.checkForUpdate(CODE_PUSH_DEPLOYMENT_KEY.Production);
//           if (!update) {
//             return;
//           }
//           const {isMandatory, isPending} = update;
//           if (isMandatory) {
//             setCodePushStatus(UpdateStatus.REQUIRE_UPDATE);
//           } else if (!isPending) {
//             updateCodepush(CODE_PUSH_DEPLOYMENT_KEY.Production, false);
//           }
//         } catch (error) {}
//       })();
//     }
//   }, [appState, isImsIp]);

//   const renderStoreButton = () => {
//     return (
//       <Pressable
//         flex
//         rowCenter
//         radius={10}
//         height={45}
//         onPress={openStore}
//         justifyContent="center"
//         backgroundColor={COLORS.primary}>
//         <Icon type="Ionicons" name={STORE.ionIconName} color={'white'} size={28} />
//         <Text font="medium" color={COLORS.white} fontSize={16} marginLeft={10}>
//           {STORE.name}
//         </Text>
//       </Pressable>
//     );
//   };

//   const renderUpdateStore = () => {
//     return (
//       <Block zIndex={9} absoluteFillObject backgroundColor={'rgba(0,0,0,0.5)'} justifyContent="center">
//         <Block radius={10} margin={12} paddingVertical={20} paddingHorizontal={12} backgroundColor={COLORS.white}>
//           <Block row marginBottom={35}>
//             <Icon type="FontAwesome" name="cloud-download" color={COLORS.primary} size={50} marginRight={15} />
//             <Block flex marginBottom={20}>
//               <Text font="bold" textTransform="uppercase" fontSize={18} color={COLORS.primary} marginBottom={8}>
//                 Đã có phiên bản mới
//               </Text>
//               <Text fontSize={15} lineHeight={25}>
//                 {storeStatus === UpdateStatus.REQUIRE_UPDATE
//                   ? 'Vui lòng đến cửa hàng và cập nhật app để tiếp tục sử dụng'
//                   : 'Hãy đến cửa hàng và cập nhật app để có những trải nghiệm tốt nhất'}
//               </Text>
//             </Block>
//           </Block>
//           <Block rowCenter>
//             {storeStatus !== UpdateStatus.REQUIRE_UPDATE && (
//               <Button
//                 flex
//                 outline
//                 title="Để sau"
//                 marginRight={12}
//                 onPress={() => setStoreStatus(UpdateStatus.LATEST)}
//               />
//             )}
//             {renderStoreButton()}
//           </Block>
//         </Block>
//       </Block>
//     );
//   };

//   const renderUpdateCodepushTest = () => {
//     const currentDeployment = (
//       Object.keys(CODE_PUSH_DEPLOYMENT_KEY) as Array<keyof typeof CODE_PUSH_DEPLOYMENT_KEY>
//     ).find(x => CODE_PUSH_DEPLOYMENT_KEY[x] === currentCodepush?.deploymentKey);
//     return (
//       <Block zIndex={9} absoluteFillObject backgroundColor={'rgba(0,0,0,0.5)'} justifyContent="center">
//         <Block backgroundColor={COLORS.white} marginHorizontal={15} radius={10}>
//           {!!currentCodepush && (
//             <Text
//               textAlign="center"
//               marginTop={20}
//               fontSize={20}
//               font="bold"
//               color={COLORS.primary}>{`${currentDeployment} | ${currentCodepush.description || ''}`}</Text>
//           )}

//           {listUpdate.map((item, _) => {
//             return (
//               <Pressable
//                 onPress={() => updateCodepush(item.key, true)}
//                 marginTop={20}
//                 contentCenter
//                 alignSelf={'center'}
//                 height={45}
//                 width={'80%'}
//                 key={item.key}
//                 backgroundColor={COLORS.primary}
//                 radius={5}>
//                 <Text color={COLORS.white} font="bold">
//                   {`${item.name} | ${item.update.description || ''}`}
//                 </Text>
//               </Pressable>
//             );
//           })}
//           <Block row justifyContent="space-between" marginHorizontal={20}>
//             <Pressable
//               disabled={!currentCodepush}
//               opacity={currentCodepush ? 1 : 0}
//               onPress={clearUpdate}
//               backgroundColor={COLORS.brightGray}
//               radius={5}
//               width={120}
//               contentCenter
//               marginVertical={10}
//               height={45}>
//               <Text>{'Gỡ cập nhật'}</Text>
//             </Pressable>

//             <Pressable
//               onPress={hideModalCPTest}
//               backgroundColor={COLORS.brightGray}
//               radius={5}
//               width={80}
//               contentCenter
//               marginVertical={10}
//               height={45}>
//               <Text>{'Bỏ qua'}</Text>
//             </Pressable>
//           </Block>
//         </Block>
//       </Block>
//     );
//   };

//   const renderUpdateCodepushProduction = () => {
//     return (
//       <Block zIndex={9} absoluteFillObject backgroundColor={'rgba(0,0,0,0.5)'} justifyContent="center">
//         <Block radius={10} margin={12} paddingVertical={20} paddingHorizontal={12} backgroundColor={COLORS.white}>
//           <Block row marginBottom={35}>
//             <Icon type="FontAwesome" name="cloud-download" color={COLORS.primary} size={50} marginRight={20} />
//             <Block flex marginBottom={20}>
//               <Text font="bold" textTransform="uppercase" fontSize={18} color={COLORS.primary} marginBottom={8}>
//                 Đã có cập nhật mới
//               </Text>
//               <Text fontSize={15} lineHeight={25}>
//                 Vui lòng cập nhật app để tiếp tục sử dụng
//               </Text>
//             </Block>
//           </Block>
//           <Button title="Cập nhật ngay" onPress={() => updateCodepush(CODE_PUSH_DEPLOYMENT_KEY.Production, true)} />
//         </Block>
//       </Block>
//     );
//   };

//   return (
//     <>
//       {storeStatus === UpdateStatus.HAVE_NEW_VERSION || storeStatus === UpdateStatus.REQUIRE_UPDATE
//         ? renderUpdateStore()
//         : listUpdate.length > 0 || currentCodepush
//         ? renderUpdateCodepushTest()
//         : codePushStatus === UpdateStatus.REQUIRE_UPDATE
//         ? renderUpdateCodepushProduction()
//         : null}
//       {(syncStatus === codePush.SyncStatus.CHECKING_FOR_UPDATE ||
//         syncStatus === codePush.SyncStatus.DOWNLOADING_PACKAGE ||
//         syncStatus === codePush.SyncStatus.INSTALLING_UPDATE) && <CodePushProgressDialog progress={downloadProgress} />}
//     </>
//   );
// };
