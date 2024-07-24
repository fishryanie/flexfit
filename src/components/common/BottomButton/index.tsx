// import React, {ReactElement} from 'react';
// import {COLORS, ShadowLevel, rhs, width} from 'theme';
// import {Block, Pressable, Shimmer, Text} from 'components/base';
// import {ActivityIndicator} from 'react-native';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';

// export type BottomButtonProps = Partial<{
//   onPress: () => void;
//   disabled: boolean;
//   loading: boolean;
//   isShimmer: boolean;
//   borderTopRadius: number;
//   maxWidth: number;
//   radius: number;
//   shadow: ShadowLevel;
//   title: string;
//   fontSize: number;
//   btnColor: string;
//   colorTitle: string;
//   paddingBottom: number;
//   backgroundColor: string;
//   TopComponent: ReactElement;
//   LeftComponent: ReactElement;
//   RightComponent: ReactElement;
// }>;

// export const BottomButton = ({
//   onPress,
//   disabled,
//   TopComponent,
//   LeftComponent,
//   RightComponent,
//   loading = false,
//   isShimmer = false,
//   title = '',
//   radius = 10,
//   fontSize = 15,
//   paddingBottom,
//   shadow = undefined,
//   borderTopRadius = 0,
//   colorTitle = COLORS.white,
//   btnColor = COLORS.primary,
//   backgroundColor = COLORS.white,
// }: BottomButtonProps) => {
//   const {bottom} = useSafeAreaInsets();

//   return (
//     <Block
//       zIndex={1}
//       position="absolute"
//       alignSelf="center"
//       bottom={0}
//       shadow={shadow}
//       width={rhs(width)}
//       paddingTop={10}
//       paddingHorizontal={12}
//       borderTopLeftRadius={borderTopRadius}
//       borderTopRightRadius={borderTopRadius}
//       paddingBottom={paddingBottom ? paddingBottom : bottom === 0 ? 10 : bottom}
//       backgroundColor={backgroundColor}>
//       {TopComponent && TopComponent}
//       <Block rowCenter>
//         {LeftComponent && LeftComponent}
//         {isShimmer ? (
//           <Shimmer flex height={45} radius={radius} />
//         ) : (
//           <Pressable
//             flex
//             height={45}
//             radius={radius}
//             onPress={onPress}
//             alignItems="center"
//             justifyContent="center"
//             opacity={disabled ? 0.3 : undefined}
//             backgroundColor={disabled ? COLORS.gray : btnColor}
//             disabled={loading || disabled}>
//             {loading ? (
//               <ActivityIndicator size="small" color={colorTitle} />
//             ) : (
//               <Text font="medium" fontSize={fontSize} color={colorTitle}>
//                 {title}
//               </Text>
//             )}
//           </Pressable>
//         )}

//         {RightComponent && RightComponent}
//       </Block>
//     </Block>
//   );
// };
