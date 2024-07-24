// import React, {useEffect, useRef} from 'react';
// import {ActivityIndicator, Animated, StyleSheet} from 'react-native';
// import {DownloadProgress} from 'react-native-code-push';
// import {Block, Text} from 'components/base';
// import {COLORS, rhs} from 'theme';

// const PROGRESS_BAR_WIDTH = 200;

// export const CodePushProgressDialog = ({progress}: {progress?: DownloadProgress}) => {
//   const progressAnim = useRef(new Animated.Value(0)).current;
//   const percent = progress?.totalBytes ? Math.round((progress.receivedBytes / progress.totalBytes) * 100) : 0;

//   const translateX = progressAnim.interpolate({
//     inputRange: [0, 100],
//     outputRange: [-PROGRESS_BAR_WIDTH, 0],
//   });

//   useEffect(() => {
//     Animated.timing(progressAnim, {
//       toValue: Math.min(percent, 100),
//       useNativeDriver: true,
//     }).start();
//   }, [percent, progressAnim]);

//   return (
//     <Block absoluteFillObject backgroundColor={'rgba(0,0,0,0.5)'} justifyContent="center" zIndex={10}>
//       <Block backgroundColor={COLORS.white} radius={10} height={200} contentCenter marginHorizontal={20}>
//         <Text lineHeight={25} textAlign="center" fontSize={16} font="medium" marginBottom={15}>
//           {'Đang cập nhật dữ liệu\nXin vui lòng đợi trong ít phút...'}
//         </Text>
//         {percent > 0 ? (
//           <Block
//             radius={10}
//             height={15}
//             borderWidth={1}
//             marginVertical={5}
//             style={{overflow: 'hidden'}}
//             backgroundColor={COLORS.white}
//             borderColor={COLORS.primary}
//             width={rhs(PROGRESS_BAR_WIDTH)}>
//             <Animated.View
//               style={{
//                 ...StyleSheet.absoluteFillObject,
//                 transform: [{translateX}],
//               }}>
//               <Block flex backgroundColor={COLORS.primary} borderTopLeftRadius={10} borderBottomLeftRadius={10} />
//             </Animated.View>
//           </Block>
//         ) : (
//           <ActivityIndicator color={COLORS.primary} size={'small'} />
//         )}
//       </Block>
//     </Block>
//   );
// };
